# EduManage — Student Management System

Full-stack starter for Task 1 from the supplied brief.

## Stack
- Next.js
- Node.js
- PostgreSQL
- Prisma ORM
- Tailwind CSS
- JWT-based demo session

## Features
- Admin login
- Dashboard
- Student records
- Teacher records
- Attendance
- Examinations
- Fee management
- PostgreSQL persistence
- Docker PostgreSQL setup

## Requirements
Node.js 22+ and Docker Desktop.

## Run

```bash
cp .env.example .env
npm install
docker compose up -d
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open http://localhost:3000

Demo login:
- Email: admin@edumanage.local
- Password: admin123

## Notes
This is a working academic project starter/MVP. For production, add stronger validation, password reset, CSRF protection where appropriate, audit logs, pagination, rate limiting, secure secret management, and more granular permissions.
# CODSOFT_TASKSNO
