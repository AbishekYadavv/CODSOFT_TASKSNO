import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
export async function POST(req:Request){
 const s=await getSession(); if(!s||s.role!=="ADMIN") return NextResponse.json({error:"Unauthorized"},{status:401});
 try{const b=await req.json();const f=await prisma.fee.create({data:{studentId:String(b.studentId),academicYear:String(b.academicYear),amount:Number(b.amount),paidAmount:Number(b.paidAmount),status:b.status,dueDate:new Date(String(b.dueDate))}});return NextResponse.json(f,{status:201});}
 catch{return NextResponse.json({error:"Could not create fee"},{status:400});}
}
