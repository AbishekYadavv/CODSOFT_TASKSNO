import Link from "next/link";
import { getSession } from "@/lib/auth";

export default async function Sidebar() {
  const session = await getSession();

  return (
    <aside className="sidebar">
      <div className="brand">EduManage</div>
      <div className="role">{session?.role || "GUEST"}</div>
      <nav className="nav">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/students">Students</Link>
        <Link href="/teachers">Teachers</Link>
        <Link href="/attendance">Attendance</Link>
        <Link href="/exams">Examinations</Link>
        <Link href="/fees">Fees</Link>
      </nav>
      <form action="/api/auth/logout" method="post">
        <button className="logout" type="submit">Logout</button>
      </form>
    </aside>
  );
}
