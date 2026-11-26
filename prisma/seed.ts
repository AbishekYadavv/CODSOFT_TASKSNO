import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Generate random Indian-format mobile number
function generatePhoneNumber(): string {
  return String(
    Math.floor(6000000000 + Math.random() * 4000000000)
  );
}

// Generate Gmail-formatted email
function createEmail(name: string, number: number): string {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .trim()
    .replace(/\s+/g, ".");

  return `${cleanName}${String(number).padStart(3, "0")}@gmail.com`;
}

const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Arjun", "Sai", "Reyansh",
  "Krishna", "Ishaan", "Rohan", "Rahul", "Amit", "Ankit",
  "Abhishek", "Ravi", "Karan", "Vikram", "Siddharth",
  "Priya", "Ananya", "Diya", "Aadhya", "Isha", "Neha",
  "Sneha", "Pooja", "Anjali", "Riya", "Kavya", "Meera",
  "Shreya", "Nisha", "Simran", "Aarohi", "Sanya"
];

const lastNames = [
  "Sharma", "Verma", "Yadav", "Singh", "Kumar",
  "Gupta", "Mishra", "Patel", "Jha", "Das",
  "Chauhan", "Reddy", "Mehta", "Joshi", "Malhotra"
];

const teacherNames = [
  "Rajesh Sharma", "Amit Kumar", "Sanjay Verma",
  "Priya Singh", "Neha Gupta", "Anjali Mishra",
  "Vikram Yadav", "Rohit Mehta", "Pooja Patel",
  "Suresh Jha", "Manish Chauhan", "Kavita Joshi",
  "Deepak Reddy", "Sunita Das", "Rakesh Malhotra",
  "Nitin Kumar", "Sneha Sharma", "Arun Singh",
  "Meena Gupta", "Anil Verma"
];

async function main() {

  const passwordHash = await bcrypt.hash("admin123", 10);

  // ADMIN
  await prisma.user.upsert({
    where: { email: "admin@edumanage.local" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@edumanage.local",
      passwordHash,
      role: Role.ADMIN
    }
  });

  console.log("Admin created!");

  // 100 STUDENTS
  for (let i = 1; i <= 100; i++) {

    const firstName = firstNames[(i - 1) % firstNames.length];
    const lastName = lastNames[(i - 1) % lastNames.length];

    const name = `${firstName} ${lastName}`;
    const email = createEmail(name, i);
    const phone = generatePhoneNumber();

    // Student login account
    await prisma.user.upsert({
      where: { email },
      update: {
        name,
        passwordHash
      },
      create: {
        name,
        email,
        passwordHash,
        role: Role.STUDENT
      }
    });

    // Student profile
    await prisma.student.upsert({
      where: {
        admissionNo: `ADM${String(i).padStart(4, "0")}`
      },

      update: {
        name,
        email,
        phone,
        course: ["BCA", "BBA", "BTECH"][(i - 1) % 3],
        semester: ((i - 1) % 6) + 1,
        section: ["A", "B", "C"][(i - 1) % 3]
      },

      create: {
        name,
        email,
        phone,
        admissionNo: `ADM${String(i).padStart(4, "0")}`,
        course: ["BCA", "BBA", "BTECH"][(i - 1) % 3],
        semester: ((i - 1) % 6) + 1,
        section: ["A", "B", "C"][(i - 1) % 3]
      }
    });
  }

  console.log("100 Students added with phone numbers and emails!");

  // 20 TEACHERS
  for (let i = 1; i <= 20; i++) {

    const name = teacherNames[i - 1];
    const email = createEmail(name, i + 100);
    const phone = generatePhoneNumber();

    // Teacher login account
    await prisma.user.upsert({
      where: { email },
      update: {
        name,
        passwordHash
      },
      create: {
        name,
        email,
        passwordHash,
        role: Role.TEACHER
      }
    });

    // Teacher profile
    await prisma.teacher.upsert({
      where: {
        employeeNo: `EMP${String(i).padStart(3, "0")}`
      },

      update: {
        name,
        email,
        phone,
        department: [
          "Computer Science",
          "Management",
          "Mathematics",
          "Commerce"
        ][(i - 1) % 4],

        subject: [
          "Java Programming",
          "Database Management",
          "Web Development",
          "Mathematics"
        ][(i - 1) % 4]
      },

      create: {
        name,
        email,
        phone,
        employeeNo: `EMP${String(i).padStart(3, "0")}`,

        department: [
          "Computer Science",
          "Management",
          "Mathematics",
          "Commerce"
        ][(i - 1) % 4],

        subject: [
          "Java Programming",
          "Database Management",
          "Web Development",
          "Mathematics"
        ][(i - 1) % 4]
      }
    });
  }

  console.log("20 Teachers added with phone numbers and emails!");

  console.log("================================");
  console.log("EDUMANAGE SEED COMPLETED!");
  console.log("100 Students");
  console.log("20 Teachers");
  console.log("1 Admin");
  console.log("================================");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });