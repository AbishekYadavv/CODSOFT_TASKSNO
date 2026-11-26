import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const user = await prisma.user.findUnique({where:{email}});
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.redirect(new URL("/login?error=1", request.url));
  }
  await createSession({userId:user.id,name:user.name,role:user.role});
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
