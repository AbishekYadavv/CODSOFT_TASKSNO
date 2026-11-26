import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
import StudentForm from "./StudentForm";

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
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
              Students
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage student profiles, admissions and academic records.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
              🎓
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Students
              </p>
              <p className="text-xl font-extrabold text-[#111827]">
                {students.length}
              </p>
            </div>
          </div>
        </div>

        {/* HERO BANNER */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-[#111827] p-7 text-white shadow-xl sm:p-9">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-xs font-bold tracking-wider text-blue-300">
              STUDENT MANAGEMENT
            </span>

            <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">
              Build a Better Learning Community.
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Manage admissions, organize academic information and keep
              all your student records in one place.
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
              Student Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Overview of your student database.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

            {/* TOTAL STUDENTS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Students
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold text-[#111827]">
                    {students.length}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  🎓
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-blue-600">
                Registered student records
              </p>
            </div>

            {/* RECENT ADMISSIONS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Recent Admissions
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold text-[#111827]">
                    {students.length > 0 ? "Latest" : "—"}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                  ✓
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-emerald-600">
                Latest student records
              </p>
            </div>

            {/* ACADEMIC RECORDS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Academic Records
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold text-[#111827]">
                    {students.length}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  📚
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-blue-600">
                Available student profiles
              </p>
            </div>

          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">

          {/* STUDENT FORM */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-1">
            <div className="border-b border-slate-100 bg-[#111827] px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
                  +
                </div>

                <div>
                  <h2 className="font-bold text-white">
                    Add New Student
                  </h2>
                  <p className="mt-1 text-xs text-slate-300">
                    Student registration form
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <StudentForm />
            </div>
          </section>

          {/* STUDENT RECORDS */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-extrabold text-[#111827]">
                  Student Records
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  All registered student information.
                </p>
              </div>

              <span className="w-fit rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                {students.length} Students
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead>
                  <tr className="bg-[#F3F6FA] text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4 font-bold">Admission No.</th>
                    <th className="px-5 py-4 font-bold">Student</th>
                    <th className="px-5 py-4 font-bold">Course</th>
                    <th className="px-5 py-4 font-bold">Semester</th>
                    <th className="px-5 py-4 font-bold">Section</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {students.map((s) => (
                    <tr
                      key={s.id}
                      className="transition-colors hover:bg-blue-50/50"
                    >
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                          {s.admissionNo}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111827] text-sm font-bold text-white">
                            {s.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-bold text-[#111827]">
                              {s.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              Student
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-700">
                        {s.course}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                          Semester {s.semester}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          {s.section}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {students.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                          🎓
                        </div>

                        <h3 className="mt-4 font-bold text-[#111827]">
                          No Students Found
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Register your first student using the form.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-400 sm:flex-row">
              <p>Showing {students.length} student records</p>
              <p className="font-semibold text-emerald-600">
                ● Database Connected
              </p>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="mt-8 border-t border-slate-200 py-5 text-center text-xs text-slate-400">
          EduManage © 2026 · Student Management System
        </footer>

      </div>
    </AppShell>
  );
}