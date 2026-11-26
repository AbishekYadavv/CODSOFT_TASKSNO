import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
import FeeForm from "./FeeForm";
import FeeRecords from "./FeeRecords";

export default async function FeesPage() {
  const [students, fees] = await Promise.all([
    prisma.student.findMany({
      orderBy: { name: "asc" },
    }),

    prisma.fee.findMany({
      include: { student: true },
      orderBy: { dueDate: "asc" },
    }),
  ]);

  const formattedFees = fees.map((fee) => ({
    id: String(fee.id),
    studentName: fee.student.name,
    admissionNo: fee.student.admissionNo,
    academicYear: fee.academicYear,
    amount: Number(fee.amount),
    paidAmount: Number(fee.paidAmount),
    status: String(fee.status),
    dueDate: fee.dueDate.toISOString(),
  }));

  const formattedStudents = students.map((student) => ({
    id: student.id,
    name: student.name,
    admissionNo: student.admissionNo,
  }));

  return (
    <AppShell>
      <div className="min-h-screen space-y-8 bg-[#f5f7fb] px-4 py-6 sm:px-6">

        {/* Header */}
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Finance Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#111827]">
            Fees Management
          </h1>

          <p className="mt-2 text-gray-500">
            Manage student fee payments and financial records.
          </p>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-[#111827] p-8 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300">
              FINANCE DASHBOARD
            </span>

            <h2 className="mt-6 text-3xl font-bold">
              Manage Your Institution's Finances
            </h2>

            <p className="mt-3 text-gray-300">
              Track collections, monitor outstanding fees and maintain
              organized student payment records.
            </p>
          </div>

          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute -bottom-20 right-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
        </div>

        {/* Add Fee Form */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Add Fee Record
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter student fee details below.
            </p>
          </div>

          <FeeForm students={formattedStudents} />
        </section>

        {/* Fee Records */}
        <FeeRecords fees={formattedFees} />

        <div className="border-t border-gray-200 pt-5 text-center text-sm text-gray-400">
          EduManage Finance Management System
        </div>

      </div>
    </AppShell>
  );
}