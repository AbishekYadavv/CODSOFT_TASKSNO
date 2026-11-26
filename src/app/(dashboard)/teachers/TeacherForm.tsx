"use client";
import { useState } from "react";
export default function TeacherForm() {
  const [msg,setMsg]=useState("");
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form=e.currentTarget;
    const data=Object.fromEntries(new FormData(form));
    const res=await fetch("/api/teachers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
    setMsg(res.ok?"Teacher added.":"Could not add teacher.");
    if(res.ok) form.reset();
  }
  return <div className="card"><h2>Add Teacher</h2><form onSubmit={submit}>
    <label className="label">Employee No.</label><input className="input" name="employeeNo" required/>
    <label className="label" style={{marginTop:12}}>Name</label><input className="input" name="name" required/>
    <label className="label" style={{marginTop:12}}>Email</label><input className="input" name="email" type="email" required/>
    <label className="label" style={{marginTop:12}}>Department</label><input className="input" name="department" required/>
    <label className="label" style={{marginTop:12}}>Subject</label><input className="input" name="subject" required/>
    <button className="btn btn-primary" style={{marginTop:15}}>Save Teacher</button>{msg&&<p className="muted">{msg}</p>}
  </form></div>
}
