import { NextResponse } from "next/server";
import { AttendanceStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    // Get request data
    const body = await req.json();

    const studentId = String(body.studentId || "").trim();
    const subject = String(body.subject || "").trim();
    const dateValue = String(body.date || "").trim();
    const status = String(body.status || "").trim().toUpperCase();

    // Validate required fields
    if (!studentId || !subject || !dateValue || !status) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Validate attendance status
    const allowedStatuses = [
      AttendanceStatus.PRESENT,
      AttendanceStatus.ABSENT,
      AttendanceStatus.LATE,
    ];

    if (!allowedStatuses.includes(status as AttendanceStatus)) {
      return NextResponse.json(
        { error: "Invalid attendance status." },
        { status: 400 }
      );
    }

    // Convert string to Prisma AttendanceStatus enum
    const attendanceStatus = status as AttendanceStatus;

    // Validate date
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      return NextResponse.json(
        { error: "Invalid attendance date." },
        { status: 400 }
      );
    }

    const date = new Date(`${dateValue}T00:00:00.000Z`);

    if (
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== dateValue
    ) {
      return NextResponse.json(
        { error: "Invalid attendance date." },
        { status: 400 }
      );
    }

    // Check student exists
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found." },
        { status: 404 }
      );
    }

    // Create or update attendance
    const attendance = await prisma.attendance.upsert({
      where: {
        date_subject_studentId: {
          date,
          subject,
          studentId,
        },
      },

      update: {
        status: attendanceStatus,
      },

      create: {
        date,
        subject,
        studentId,
        status: attendanceStatus,
      },
    });

    return NextResponse.json(
      {
        message: "Attendance saved successfully.",
        attendance,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Attendance API Error:", error);

    return NextResponse.json(
      {
        error: "Could not save attendance. Please try again.",
      },
      { status: 500 }
    );
  }
}