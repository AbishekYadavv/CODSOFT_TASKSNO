"use client";
import { useState } from "react";

export default function StudentForm() {
  const [message, setMessage] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch("/api/students", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)});
    setMessage(res.ok ? "Student added successfully." : "Could not add student.");
    if (res.ok) form.reset();
  }
  return <div className="card">
    <h2>Add Student</h2>
    <form onSubmit={submit}>
      <label className="label">Admission No.</label><input className="input" name="admissionNo" required />
      <label className="label" style={{marginTop:12}}>Full Name</label><input className="input" name="name" required />
      <label className="label" style={{marginTop:12}}>Email</label><input className="input" name="email" type="email" required />
      <div className="grid grid-2" style={{marginTop:12}}>
        <div><label className="label">Course</label><input className="input" name="course" defaultValue="BCA" required /></div>
        <div><label className="label">Semester</label><input className="input" name="semester" type="number" min="1" max="12" defaultValue="1" required /></div>
      </div>
      <div className="grid grid-2" style={{marginTop:12}}>
        <div><label className="label">Section</label><input className="input" name="section" defaultValue="A" required /></div>
        <div><label className="label">Phone</label><input className="input" name="phone" /></div>
      </div>
      <button className="btn btn-primary" style={{marginTop:15}}>Save Student</button>
      {message && <p className="muted">{message}</p>}
    </form>
  </div>;
}
