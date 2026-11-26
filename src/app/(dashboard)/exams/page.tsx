import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
import ExamForm from "./ExamForm";

export default async function ExamsPage() {
  const exams=await prisma.exam.findMany({include:{_count:{select:{results:true}}},orderBy:{examDate:"desc"}});
  return <AppShell><h1 className="title">Examinations</h1><p className="subtitle">Manage exams and academic assessment records.</p>
  <div style={{marginTop:20}}><ExamForm/></div>
  <div className="card" style={{marginTop:18}}><h2>Exam Schedule</h2><div className="table-wrap"><table><thead><tr><th>Exam</th><th>Subject</th><th>Date</th><th>Max Marks</th><th>Results</th></tr></thead><tbody>
  {exams.map(e=><tr key={e.id}><td>{e.name}</td><td>{e.subject}</td><td>{e.examDate.toISOString().slice(0,10)}</td><td>{e.maxMarks}</td><td>{e._count.results}</td></tr>)}
  </tbody></table></div></div></AppShell>;
}
