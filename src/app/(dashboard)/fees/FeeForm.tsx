 "use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Student = {
  id: string;
  name: string;
  admissionNo: string;
};

export default function FeeForm({
  students,
}: {
  students: Student[];
}) {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Store form reference before await
    const form = e.currentTarget;

    const data = Object.fromEntries(new FormData(form));

    setLoading(true);
    setMsg("");

    try {
      const response = await fetch("/api/fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMsg("Fee record saved successfully!");
        form.reset();
      } else {
        const result = await response.json().catch(() => null);
        setMsg(result?.error || "Could not save fee record.");
      }
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">

      <form onSubmit={submit} className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Student */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Select Student
          </label>

          <select
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
            name="studentId"
            required
            defaultValue=""
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

        {/* Academic Year */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Academic Year
          </label>

          <input
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            name="academicYear"
            defaultValue="2026-27"
            required
          />
        </div>

        {/* Total Amount */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Total Fee Amount (₹)
          </label>

          <input
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            type="number"
            name="amount"
            placeholder="Enter total amount"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Paid Amount */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Paid Amount (₹)
          </label>

          <input
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            type="number"
            name="paidAmount"
            placeholder="Enter paid amount"
            min="0"
            step="0.01"
            defaultValue="0"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Payment Status
          </label>

          <select
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
            name="status"
            defaultValue="PENDING"
            required
          >
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Due Date
          </label>

          <input
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            type="date"
            name="dueDate"
            required
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">

          <button
            type="submit"
            disabled={loading || students.length === 0}
            className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Fee Record"}
          </button>

          {students.length === 0 && (
            <p className="mt-2 text-sm text-red-500">
              Please register a student before adding a fee record.
            </p>
          )}

          {msg && (
            <p className="mt-3 rounded-lg bg-gray-50 p-3 text-sm font-medium text-gray-700">
              {msg}
            </p>
          )}

        </div>

      </form>
    </div>
  );
}