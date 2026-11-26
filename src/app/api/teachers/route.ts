import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
export async function POST(req:Request){
 const s=await getSession(); if(!s||s.role!=="ADMIN") return NextResponse.json({error:"Unauthorized"},{status:401});
 try{const b=await req.json();const t=await prisma.teacher.create({data:{employeeNo:String(b.employeeNo),name:String(b.name),email:String(b.email),department:String(b.department),subject:String(b.subject)}});return NextResponse.json(t,{status:201});}
 catch{return NextResponse.json({error:"Could not create teacher"},{status:400});}
}
