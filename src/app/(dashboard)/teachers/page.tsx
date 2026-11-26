import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
import TeacherForm from "./TeacherForm";

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <AppShell>
      <div className="min-h-screen w-full bg-[#f5f7fb] px-4 py-6 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              EDUMANAGE / MANAGEMENT
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#111827]">
              Teachers
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage faculty profiles, departments and teaching assignments.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
              👨‍🏫
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Teachers
              </p>
              <p className="text-xl font-extrabold text-[#111827]">
                {teachers.length}
              </p>
            </div>
          </div>
        </div>

        {/* HERO BANNER */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-[#111827] p-7 text-white shadow-xl sm:p-9">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-xs font-bold tracking-wider text-blue-300">
              FACULTY MANAGEMENT
            </span>

            <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">
              Empowering Educators, Building Futures.
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Organize faculty information, manage departments and maintain
              teaching records in one centralized platform.
            </p>
          </div>

          <div className="absolute -right-12 -top-24 h-72 w-72 rounded-full border-[40px] border-blue-500/10" />
          <div className="absolute -bottom-32 right-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-1 w-full bg-gradient-to-r from-blue-600 via-emerald-500 to-transparent" />
        </section>

        {/* STATISTICS */}
        <section className="mb-8">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[#111827]">
              Faculty Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Overview of your teaching staff.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

            {/* TOTAL TEACHERS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Teachers
                  </p>

                  <h3 className="mt-2 text-3xl font-extrabold text-[#111827]">
                    {teachers.length}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  👨‍🏫
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-blue-600">
                Registered faculty members
              </p>
            </div>

            {/* DEPARTMENTS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Departments
                  </p>

                  <h3 className="mt-2 text-3xl font-extrabold text-[#111827]">
                    {new Set(teachers.map((t) => t.department)).size}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                  🏢
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-emerald-600">
                Represented departments
              </p>
            </div>

            {/* SUBJECTS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Subjects
                  </p>

                  <h3 className="mt-2 text-3xl font-extrabold text-[#111827]">
                    {new Set(teachers.map((t) => t.subject)).size}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  📚
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-blue-600">
                Unique subjects assigned
              </p>
            </div>

          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">

          {/* TEACHER FORM */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-1">
            <div className="border-b border-slate-100 bg-[#111827] px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
                  +
                </div>

                <div>
                  <h2 className="font-bold text-white">
                    Add New Teacher
                  </h2>

                  <p className="mt-1 text-xs text-slate-300">
                    Faculty registration form
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <TeacherForm />
            </div>
          </section>

          {/* FACULTY RECORDS */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-extrabold text-[#111827]">
                  Faculty Records
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  All registered teacher information.
                </p>
              </div>

              <span className="w-fit rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                {teachers.length} Teachers
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead>
                  <tr className="bg-[#F3F6FA] text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4 font-bold">Employee No.</th>
                    <th className="px-5 py-4 font-bold">Teacher</th>
                    <th className="px-5 py-4 font-bold">Department</th>
                    <th className="px-5 py-4 font-bold">Subject</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {teachers.map((t) => (
                    <tr
                      key={t.id}
                      className="transition-colors hover:bg-blue-50/50"
                    >
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                          {t.employeeNo}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                            {t.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-bold text-[#111827]">
                              {t.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Faculty Member
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          {t.department}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-700">
                        {t.subject}
                      </td>
                    </tr>
                  ))}

                  {teachers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-5 py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                          👨‍🏫
                        </div>

                        <h3 className="mt-4 font-bold text-[#111827]">
                          No Teachers Found
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Add your first teacher using the registration form.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-400 sm:flex-row">
              <p>Showing {teachers.length} faculty records</p>

              <p className="font-semibold text-emerald-600">
                ● Faculty Records
              </p>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="mt-8 border-t border-slate-200 py-5 text-center text-xs text-slate-400">
          EduManage © 2026 · Faculty Management System
        </footer>

      </div>
    </AppShell>
  );
}