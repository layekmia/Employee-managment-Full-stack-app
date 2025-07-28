# 🏢 WorkSync – Employee Management Dashboard

A modern full-stack role-based employee management system built with React, Firebase, Node.js, Express, and MongoDB. Designed for scalability, security, and usability, it supports dynamic dashboards, real-time task reporting, role-based access control (RBAC), JWT-secured APIs, and modern UI/UX with Tailwind and Shadcn components.

---

## 🌐 Live Preview

🔗 [Live Site](https://worksyncemployee.netlify.app/)  
📂 [Backend Repository](https://github.com/layekmia/Employee-managment-server?tab=readme-ov-file)

---

## ⚙️ Tech Stack

### 🖥️ Frontend

- React 19, React Router v7  
- Tailwind CSS, Shadcn/UI, Flowbite  
- Firebase Authentication  
- React Hook Form  
- TanStack Table v8  
- Recharts, React Chart.js 2  
- Framer Motion, AOS  

### 🗄️ Backend

- Node.js, Express.js, MongoDB, Mongoose  
- JWT Authentication Middleware  
- Firebase Admin SDK  
- Stripe (optional payment integration)  
- dotenv for environment variables

---

## 📌 Features

### 🔐 Authentication

- Firebase Email/Password and Google login  
- Role-based registration (Admin role excluded in frontend)  
- JWT-based backend protection  
- Error validation for login and registration

### 🧑‍💼 User Roles

- **Admin**: Manage HR/Employee roles, update salaries, terminate employees  
- **HR**: Verify employees, process salaries, monitor progress reports  
- **Employee**: Submit work reports, view payment history

### ⚙️ Additional Functionalities

- Toggle between card view and table view  
- Stripe payment integration  
- Admin-only salary update restrictions  
- JWT Middleware for secure backend mutations  
- Dark/Light mode theme toggle  
- Real-time, no-page-refresh updates using React Query

---

## 🧭 Pages & Routes

| Route                           | Access    | Description                                |
| -------------------------------| --------- | ------------------------------------------|
| `/`                            | Public    | Home page with banner, services, testimonials |
| `/contact-us`                  | Public    | Contact form with dummy company details   |
| `/auth/login`, `/auth/register`| Public    | Authentication with validation             |
| `/dashboard/overview`          | Private   | Summary dashboard (role-based)             |
| `/dashboard/work-sheet`        | Employee  | Submit and view task records                |
| `/dashboard/payment-history`   | Employee  | View payment history                        |
| `/dashboard/employee-list`     | HR        | Verify, pay, and view employee details     |
| `/dashboard/progress`          | HR        | Filter and view employee tasks              |
| `/dashboard/all-employee`      | Admin     | Manage employees and HR roles               |
| `/dashboard/payroll`           | Admin     | Approve monthly salaries                    |
| `/unauthorized`                | Public    | Access denied page                          |
| `*`                            | Public    | 404 Not Found page                          |

---

## 🔐 Authentication Validations

### Register

- Password must be at least 6 characters  
- Include at least one uppercase letter  
- Include at least one special character  
- Role selection is required (Admin role registration disabled in frontend)

### Login

- Firebase error messages for incorrect email/password  
- Error for unregistered accounts

---

## 📊 Charts & Visuals

- Monthly User Growth Line Chart (Admin only)  
- Salary vs Month Bar Chart (HR view)  
- Real-time progress filtering and toggled grid/table views

---

## 🧪 Getting Started

### 1. Clone Repositories

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-layekmia.git
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-layekmia.git
