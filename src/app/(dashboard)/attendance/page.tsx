import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
import AttendanceForm from "./AttendanceForm";

export default async function AttendancePage() {
  const [students, records] = await Promise.all([
    prisma.student.findMany({orderBy:{name:"asc"}}),
    prisma.attendance.findMany({include:{student:true},orderBy:{date:"desc"},take:20})
  ]);
  return <AppShell><h1 className="title">Attendance</h1><p className="subtitle">Record and review student attendance.</p>
    <div style={{marginTop:20}}><AttendanceForm students={students.map(s=>({id:s.id,name:s.name,admissionNo:s.admissionNo}))}/></div>
    <div className="card" style={{marginTop:18}}><h2>Recent Attendance</h2><div className="table-wrap"><table><thead><tr><th>Date</th><th>Student</th><th>Subject</th><th>Status</th></tr></thead><tbody>
    {records.map(r=><tr key={r.id}><td>{r.date.toISOString().slice(0,10)}</td><td>{r.student.name}</td><td>{r.subject}</td><td><span className={`badge ${r.status==="PRESENT"?"badge-green":r.status==="LATE"?"badge-yellow":"badge-red"}`}>{r.status}</span></td></tr>)}
    </tbody></table></div></div>
  </AppShell>;
}
