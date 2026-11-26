import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
import Link from "next/link";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-IN").format(value);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) return null;

  const [
    totalStudents,
    totalTeachers,
    presentAttendance,
    totalExams,
    feeSummary,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.attendance.count({
      where: { status: "PRESENT" },
    }),
    prisma.exam.count(),
    prisma.fee.aggregate({
      _sum: {
        amount: true,
        paidAmount: true,
      },
    }),
  ]);

  const totalFees = Number(feeSummary._sum.amount ?? 0);
  const paidFees = Number(feeSummary._sum.paidAmount ?? 0);
  const outstanding = totalFees - paidFees;

  const collectionPercentage =
    totalFees > 0 ? Math.round((paidFees / totalFees) * 100) : 0;

  const stats = [
    {
      title: "Total Students",
      value: formatNumber(totalStudents),
      subtitle: "Registered students",
      icon: "♙",
      color: "blue",
      link: "/students",
    },
    {
      title: "Total Teachers",
      value: formatNumber(totalTeachers),
      subtitle: "Faculty members",
      icon: "♧",
      color: "purple",
      link: "/teachers",
    },
    {
      title: "Present Attendance",
      value: formatNumber(presentAttendance),
      subtitle: "Total present records",
      icon: "✓",
      color: "green",
      link: "/attendance",
    },
    {
      title: "Total Exams",
      value: formatNumber(totalExams),
      subtitle: "Scheduled examinations",
      icon: "▤",
      color: "orange",
      link: "/exams",
    },
  ];

  const actions = [
    {
      title: "Add Student",
      description: "Register a new student",
      icon: "♙",
      href: "/students",
      color: "blue",
    },
    {
      title: "Add Teacher",
      description: "Manage faculty members",
      icon: "♧",
      href: "/teachers",
      color: "purple",
    },
    {
      title: "Attendance",
      description: "Manage student attendance",
      icon: "✓",
      href: "/attendance",
      color: "green",
    },
    {
      title: "Manage Exams",
      description: "Create and manage exams",
      icon: "▤",
      href: "/exams",
      color: "orange",
    },
    {
      title: "Manage Fees",
      description: "Track student payments",
      icon: "₹",
      href: "/fees",
      color: "pink",
    },
  ];

  const firstName = session.name?.split(" ")[0] || "Admin";

  return (
    <AppShell>
      <main className="min-h-screen bg-[#f5f7fb] px-4 py-6 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-blue-600">
              EduManage / Overview
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Welcome back, {session.name}. Here's your institution's overview.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white">
              {firstName.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                {session.name}
              </p>
              <p className="text-xs capitalize text-slate-500">
                {session.role?.toLowerCase()} Account
              </p>
            </div>
          </div>
        </div>

        {/* WELCOME BANNER */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#172554] via-[#1e40af] to-[#4f46e5] p-7 text-white shadow-xl sm:p-9">
          <div className="relative z-10 max-w-xl">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
              INSTITUTION OVERVIEW
            </span>

            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
              Welcome to EduManage 👋
            </h2>

            <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
              Manage students, faculty, attendance, examinations and fee
              collections from one convenient dashboard.
            </p>

            <Link
              href="/students"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-800 shadow-lg transition hover:-translate-y-1 hover:bg-blue-50"
            >
              Explore Students
              <span>→</span>
            </Link>
          </div>

          <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        </section>

        {/* STATISTICS */}
        <div className="mb-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Institution Statistics
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A quick overview of your institution.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <Link
                key={stat.title}
                href={stat.link}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold
                    ${
                      stat.color === "blue"
                        ? "bg-blue-50 text-blue-600"
                        : stat.color === "purple"
                        ? "bg-purple-50 text-purple-600"
                        : stat.color === "green"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {stat.icon}
                  </div>

                  <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">
                    →
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  {stat.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* FINANCIAL OVERVIEW */}
        <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-3">

          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Fee Collection Overview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Financial summary of student fees.
                </p>
              </div>

              <Link
                href="/fees"
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                View Fees →
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-medium text-blue-700">
                  Total Fees
                </p>
                <h3 className="mt-2 text-2xl font-bold text-blue-950">
                  {formatCurrency(totalFees)}
                </h3>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-5">
                <p className="text-sm font-medium text-emerald-700">
                  Collected Amount
                </p>
                <h3 className="mt-2 text-2xl font-bold text-emerald-950">
                  {formatCurrency(paidFees)}
                </h3>
              </div>

              <div className="rounded-2xl bg-orange-50 p-5">
                <p className="text-sm font-medium text-orange-700">
                  Outstanding Fees
                </p>
                <h3 className="mt-2 text-2xl font-bold text-orange-950">
                  {formatCurrency(outstanding)}
                </h3>
              </div>

              <div className="rounded-2xl bg-purple-50 p-5">
                <p className="text-sm font-medium text-purple-700">
                  Collection Rate
                </p>
                <h3 className="mt-2 text-2xl font-bold text-purple-950">
                  {collectionPercentage}%
                </h3>
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  Fee Collection Progress
                </span>
                <span className="text-sm font-bold text-blue-700">
                  {collectionPercentage}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-700"
                  style={{
                    width: `${collectionPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Based on total recorded fees and paid amounts.
              </p>
            </div>
          </section>

          {/* QUICK SUMMARY */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Quick Summary
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current institution records.
            </p>

            <div className="mt-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Students
                  </p>
                  <p className="text-xs text-slate-400">
                    Registered
                  </p>
                </div>
                <span className="rounded-lg bg-blue-50 px-3 py-2 font-bold text-blue-700">
                  {totalStudents}
                </span>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Teachers
                  </p>
                  <p className="text-xs text-slate-400">
                    Faculty
                  </p>
                </div>
                <span className="rounded-lg bg-purple-50 px-3 py-2 font-bold text-purple-700">
                  {totalTeachers}
                </span>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Exams
                  </p>
                  <p className="text-xs text-slate-400">
                    Total scheduled
                  </p>
                </div>
                <span className="rounded-lg bg-orange-50 px-3 py-2 font-bold text-orange-700">
                  {totalExams}
                </span>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Attendance
                  </p>
                  <p className="text-xs text-slate-400">
                    Present records
                  </p>
                </div>
                <span className="rounded-lg bg-emerald-50 px-3 py-2 font-bold text-emerald-700">
                  {presentAttendance}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* QUICK ACTIONS */}
        <section className="mb-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Quick Actions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Quickly access important management sections.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {actions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold
                  ${
                    action.color === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : action.color === "purple"
                      ? "bg-purple-50 text-purple-600"
                      : action.color === "green"
                      ? "bg-emerald-50 text-emerald-600"
                      : action.color === "orange"
                      ? "bg-orange-50 text-orange-600"
                      : "bg-pink-50 text-pink-600"
                  }`}
                >
                  {action.icon}
                </div>

                <h3 className="mt-4 font-bold text-slate-800">
                  {action.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {action.description}
                </p>

                <div className="mt-4 text-sm font-semibold text-blue-600 transition group-hover:translate-x-1">
                  Open section →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
          EduManage © 2026 · Institution Management System
        </footer>

      </main>
    </AppShell>
  );
}