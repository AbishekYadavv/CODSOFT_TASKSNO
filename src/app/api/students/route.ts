import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req:Request){
  const session=await getSession();
  if(!session || session.role!=="ADMIN") return NextResponse.json({error:"Unauthorized"},{status:401});
  try{
    const b=await req.json();
    const student=await prisma.student.create({data:{
      admissionNo:String(b.admissionNo),name:String(b.name),email:String(b.email),
      course:String(b.course),semester:Number(b.semester),section:String(b.section),
      phone:b.phone?String(b.phone):undefined
    }});
    return NextResponse.json(student,{status:201});
  }catch(e){return NextResponse.json({error:"Could not create student"},{status:400});}
}
