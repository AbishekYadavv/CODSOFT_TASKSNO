"use client";
import {useState} from "react";
export default function ExamForm(){
 const [msg,setMsg]=useState("");
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));const r=await fetch("/api/exams",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});setMsg(r.ok?"Exam created.":"Could not create exam.");if(r.ok)e.currentTarget.reset();}
 return <div className="card"><h2>Create Exam</h2><form onSubmit={submit} className="grid grid-2">
 <div><label className="label">Exam Name</label><input className="input" name="name" placeholder="Mid Term" required/></div>
 <div><label className="label">Subject</label><input className="input" name="subject" required/></div>
 <div><label className="label">Exam Date</label><input className="input" name="examDate" type="date" required/></div>
 <div><label className="label">Maximum Marks</label><input className="input" name="maxMarks" type="number" min="1" defaultValue="100" required/></div>
 <div><button className="btn btn-primary">Create Exam</button></div></form>{msg&&<p className="muted">{msg}</p>}</div>
}
