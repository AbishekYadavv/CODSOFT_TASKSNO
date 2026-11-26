 "use client";

import { useMemo, useState } from "react";

type Fee = {
  id: string;
  studentName: string;
  admissionNo: string;
  academicYear: string;
  amount: number;
  paidAmount: number;
  status: string;
  dueDate: string;
};

export default function FeeRecords({
  fees = [],
}: {
  fees?: Fee[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("ASC");

  const safeFees = Array.isArray(fees) ? fees : [];

  const money = (value: number) =>
    `₹${value.toLocaleString("en-IN")}`;

  // Search and filter
  const filteredFees = useMemo(() => {
    return safeFees
      .filter((fee) => {
        const text =
          `${fee.studentName} ${fee.admissionNo} ${fee.academicYear}`.toLowerCase();

        const matchesSearch = text.includes(search.toLowerCase());

        const matchesFilter =
          filter === "ALL" ||
          fee.status.toUpperCase() === filter;

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        const difference =
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime();

        return sortOrder === "ASC" ? difference : -difference;
      });
  }, [safeFees, search, filter, sortOrder]);

  // Financial calculations
  const totalAmount = safeFees.reduce(
    (sum, fee) => sum + fee.amount,
    0
  );

  const totalPaid = safeFees.reduce(
    (sum, fee) => sum + fee.paidAmount,
    0
  );

  const outstanding = safeFees.reduce(
    (sum, fee) => sum + Math.max(0, fee.amount - fee.paidAmount),
    0
  );

  const paidCount = safeFees.filter(
    (fee) => fee.status.toUpperCase() === "PAID"
  ).length;

  const pendingCount = safeFees.filter(
    (fee) => fee.status.toUpperCase() === "PENDING"
  ).length;

  const overdueCount = safeFees.filter(
    (fee) => fee.status.toUpperCase() === "OVERDUE"
  ).length;

  return (
    <div className="space-y-6">

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-[#111827] p-6 text-white shadow">
          <p className="text-sm text-gray-300">Total Fees</p>
          <h2 className="mt-3 text-3xl font-bold">
            {money(totalAmount)}
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Total recorded amount
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-600 p-6 text-white shadow">
          <p className="text-sm text-emerald-100">Collected</p>
          <h2 className="mt-3 text-3xl font-bold">
            {money(totalPaid)}
          </h2>
          <p className="mt-2 text-xs text-emerald-100">
            Successfully collected
          </p>
        </div>

        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow">
          <p className="text-sm text-blue-100">Outstanding</p>
          <h2 className="mt-3 text-3xl font-bold">
            {money(outstanding)}
          </h2>
          <p className="mt-2 text-xs text-blue-100">
            Remaining fee balance
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow border border-gray-100">
          <p className="text-sm text-gray-500">Total Records</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            {safeFees.length}
          </h2>
          <p className="mt-2 text-xs text-emerald-600">
            {paidCount} paid records
          </p>
        </div>

      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-700">
            Paid Records
          </p>
          <h3 className="mt-2 text-2xl font-bold text-emerald-800">
            {paidCount}
          </h3>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-700">
            Pending Records
          </p>
          <h3 className="mt-2 text-2xl font-bold text-amber-800">
            {pendingCount}
          </h3>
        </div>

        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            Overdue Records
          </p>
          <h3 className="mt-2 text-2xl font-bold text-red-800">
            {overdueCount}
          </h3>
        </div>

      </div>

      {/* Records Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-6">

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Fee Records
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Search and manage student payment records.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search student or admission no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 lg:max-w-sm"
            />

          </div>

          {/* Filters */}
          <div className="mt-5 flex flex-wrap gap-2">

            {["ALL", "PAID", "PENDING", "OVERDUE"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}

            <button
              onClick={() =>
                setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")
              }
              className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
            >
              Due Date: {sortOrder === "ASC" ? "Oldest" : "Newest"}
            </button>

          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Academic Year</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Paid</th>
                <th className="px-6 py-4">Balance</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Due Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredFees.map((fee) => {
                const balance = Math.max(0, fee.amount - fee.paidAmount);
                const status = fee.status.toUpperCase();

                return (
                  <tr key={fee.id} className="transition hover:bg-gray-50">

                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {fee.studentName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {fee.admissionNo}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {fee.academicYear}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900">
                      {money(fee.amount)}
                    </td>

                    <td className="px-6 py-4 font-semibold text-emerald-600">
                      {money(fee.paidAmount)}
                    </td>

                    <td className="px-6 py-4 font-semibold text-red-500">
                      {money(balance)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          status === "PAID"
                            ? "bg-emerald-100 text-emerald-700"
                            : status === "OVERDUE"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {new Date(fee.dueDate).toLocaleDateString("en-IN")}
                    </td>

                  </tr>
                );
              })}

              {filteredFees.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center"
                  >
                    <div className="text-4xl">📄</div>
                    <h3 className="mt-3 font-bold text-gray-800">
                      No Fee Records Found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try changing your search or filter.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        <div className="border-t border-gray-100 px-6 py-4 text-sm text-gray-500">
          Showing {filteredFees.length} of {safeFees.length} records
        </div>

      </div>

    </div>
  );
}