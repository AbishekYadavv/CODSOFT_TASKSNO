import { getSession } from "@/lib/auth";
import "./login.css";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="brand-large">EduManage</div>
        <p className="muted">Student Management System</p>
        <form action="/api/auth/login" method="post">
          <label className="label">Email</label>
          <input className="input" name="email" type="email" defaultValue="admin@edumanage.local" required />
          <label className="label" style={{marginTop:14}}>Password</label>
          <input className="input" name="password" type="password" defaultValue="admin123" required />
          <button className="btn btn-primary" style={{width:"100%", marginTop:18}}>Login</button>
        </form>
        <p className="hint">Demo: admin@edumanage.local / admin123</p>
      </div>
    </main>
  );
}
