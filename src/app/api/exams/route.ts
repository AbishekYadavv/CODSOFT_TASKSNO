import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
export async function POST(req:Request){
 const s=await getSession(); if(!s||s.role!=="ADMIN") return NextResponse.json({error:"Unauthorized"},{status:401});
 try{const b=await req.json();const e=await prisma.exam.create({data:{name:String(b.name),subject:String(b.subject),examDate:new Date(String(b.examDate)),maxMarks:Number(b.maxMarks)}});return NextResponse.json(e,{status:201});}
 catch{return NextResponse.json({error:"Could not create exam"},{status:400});}
}
