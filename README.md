# 🏢 Employee Management Dashboard

A full-stack role-based employee management system built with React, Firebase, Node.js, Express, and MongoDB. It includes authentication, dynamic dashboards for different roles (Admin, HR, Employee), real-time charts, secure APIs using JWT, and modern UI design with Flowbite & Shadcn.

## 🌐 Live Demo

🔗 [View Live Site](https://worksyncemployee.netlify.app/)  
🛠️ Backend API: [Backend Repository](https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-layekmia.git)

---

## 📌 Features

### 🔐 Authentication

- Firebase Email/Password and Google login
- Role-based registration (Admin role excluded in frontend)
- JWT-based backend protection
- Error validation for both login & registration

### 🧑‍💼 User Roles

- **Admin**: Control HR/Employee roles, salary updates, and fire users
- **HR**: Verify employees, pay salaries, and view progress reports
- **Employee**: Submit work reports and view payment history

### 🧭 Pages & Routes

| Path                             | Access   | Description                                        |
| -------------------------------- | -------- | -------------------------------------------------- |
| `/`                              | Public   | Home page with banner, services, testimonials      |
| `/contact-us`                    | Public   | Dummy company address + contact form               |
| `/auth/login` & `/auth/register` | Public   | Auth with validation                               |
| `/dashboard/overview`            | Private  | Summary dashboard                                  |
| `/dashboard/work-sheet`          | Employee | Submit and view task records                       |
| `/dashboard/payment-history`     | Employee | View payment history                               |
| `/dashboard/employee-list`       | HR       | Verify, pay, view details of employees             |
| `/dashboard/progress`            | HR       | Filter and view all employee tasks                 |
| `/dashboard/all-employee`        | Admin    | Manage employees and HRs                           |
| `/dashboard/payroll`             | Admin    | Approve monthly salaries from HR                   |
| `/unauthorized`                  | Public   | Shown when user tries to access invalid role route |
| `*`                              | Public   | Not Found page                                     |

---

## 💻 Technologies & Libraries

### Frontend

- **React 19** + **React Router v7**
- **Firebase Auth**
- **TailwindCSS** + **Flowbite** + **Shadcn/UI**
- **Recharts** & **React Chart.js 2**
- **React Hook Form**
- **TanStack Table v8**
- **AOS** for animations
- **Framer Motion** for transitions
- **SweetAlert2** for modals and confirmations

### Backend

- **Node.js**, **Express**, **Mongoose** **dotenv** **Firebase-admin**
- **JWT Auth middleware**
- **Stripe (optional) for payment gateway**

---

## 🔑 Authentication Validations

### Register

- Password must be:
  - At least 6 characters
  - 1 Capital letter
  - 1 Special character
- Role selection required (Admin not allowed)

### Login

- Firebase error messages shown for:
  - Wrong email/password
  - Unregistered account

---

## 📊 Charts & Visuals

- Monthly User Growth Line Chart (Admin only)
- Salary vs Month Bar Chart (HR Details View)
- Real-time progress filtering
- Task summary + toggled grid or table view

---

## 🧪 Optional & Bonus Features

- 🔁 Toggle between card view and table view
- 💸 Stripe Integration (challenge)
- ⚙️ Admin-only salary update restrictions
- 🔐 JWT Middleware for secure backend mutation
- 🌙 Theme Toggle (Dark/Light mode)
- 🔥 Real-time no-page-refresh updates using React Query

---

## 🚀 Getting Started

### 1. Clone Repositories

```bash
git clonehttps://github.com/Programming-Hero-Web-Course4/b11a12-client-side-layekmia.git
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-layekmia.git
```
