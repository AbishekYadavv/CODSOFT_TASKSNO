 "use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Student = {
  id: string;
  name: string;
  admissionNo: string;
};

export default function AttendanceForm({
  students,
}: {
  students: Student[];
}) {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Today's date in local time
  const today = new Date();
  const defaultDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMsg("Attendance saved successfully!");
        form.reset();
      } else {
        const result = await res.json().catch(() => null);
        setMsg(result?.error || "Could not save attendance.");
      }
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

      {/* Header */}
      <div className="border-b border-gray-100 bg-[#111827] p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-2xl">
            ✓
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Mark Attendance
            </h2>
            <p className="mt-1 text-sm text-gray-300">
              Record daily student attendance.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

        {/* Student */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Select Student
          </label>

          <select
            name="studentId"
            required
            defaultValue=""
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Choose student
            </option>

            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.admissionNo} — {student.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Attendance Date
          </label>

          <input
            type="date"
            name="date"
            defaultValue={defaultDate}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Subject
          </label>

          <input
            type="text"
            name="subject"
            placeholder="e.g. Database Management"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Attendance Status
          </label>

          <select
            name="status"
            defaultValue="PRESENT"
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
            <option value="LATE">Late</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex flex-col gap-3 md:col-span-2">

          <button
            type="submit"
            disabled={loading || students.length === 0}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
          >
            {loading ? "Saving Attendance..." : "Save Attendance"}
          </button>

          {students.length === 0 && (
            <p className="text-sm text-red-500">
              Register students before marking attendance.
            </p>
          )}

          {msg && (
            <p className="rounded-xl bg-gray-50 p-4 text-sm font-semibold text-gray-700">
              {msg}
            </p>
          )}

        </div>
      </form>
    </div>
  );
}