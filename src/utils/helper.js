import { assets } from "../assets/assets";

const generateRandomBankAccount = () => {
  const accountNumber = `4235${Math.floor(
    1000000000 + Math.random() * 9000000000
  )}`;
  return accountNumber;
};

const dashboardRouteTitles = {
  "/dashboard/overview": "Overview",
  "/dashboard/work-sheet": "Work Sheet",
  "/dashboard/payment-history": "Payment History",
  "/dashboard/employee-list": "Employee List",
  "/dashboard/progress": "Progress",
  "/dashboard/all-employee": "All Employee",
  "/dashboard/payroll": "Payroll",
  "/dashboard/settings": "Settings",
};

const services = [
  {
    title: "Core HRMS",
    description:
      "Employee management, directory, workflows, self-service, document management",
    icon: "https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2024/12/Frame-2085664328.svg",
  },
  {
    title: "Attendance",
    description:
      "Monitor attendance, schedule smart shifts, and make many attendance methods possible.",
    icon: "https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2024/12/Frame-2085664328-5.svg",
  },
  {
    title: "Leave Management",
    description:
      "Configure every type of leave policy and use leave dashboards and reports for tracking.",
    icon: "https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2024/12/Frame-2085664328-1.svg",
  },
  {
    title: "Payroll",
    description:
      "End-to-end payroll processing, taxing, benefits tracking, exemptions, User Payslip.",
    icon: "https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2024/12/Frame-2085664327.svg",
  },
  {
    title: "Task Management",
    description:
      "Plan tasks, track and complete them efficiently, delegate tasks and set reminders.",
    icon: "https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2024/12/Frame-2085664327-5.svg",
  },
  {
    title: "Performance Management",
    description:
      "Staff evaluations, goal setting, talent management and ongoing 360-degree feedback.",
    icon: "https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2024/12/Frame-2085664327-2.svg",
  },
  {
    title: "Onboarding",
    description:
      "Acquire talents, skills and have a smooth run for employees from day one.",
    icon: "https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2024/12/Frame-2085664327-3.svg",
  },
  {
    title: "Recruitment",
    description:
      "AI-enabled engine for hiring, skill set matches, tracking interviews and feedback.",
    icon: "https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2024/12/Frame-2085664327-5.svg",
  },
];

const hrSolutions = [
  {
    id: 1,
    title: "HR MANAGEMENT SIMPLIFIED",
    description:
      "Adapt to new realities, work faster and smarter. Determine a defined future of work for your organization with a strong, flexible, global HR solution.",
    features: [
      "Easy access to documents and information",
      "An employee database that scales",
      "Smart HR workflows",
      "Automation of HR processes",
    ],
    image: assets.hremployee,
  },
  {
    id: 2,
    title: "PAYROLL MANAGEMENT",
    description:
      "Simplify the complex processes of the payroll with RapidHR, also a powerful, secure, accurate, automated and 100% compliant system!Rapid HR provides quicker processing, precise payouts, any business that wants to prevent potential financial and legal repercussions from non-compliance and guarantee that employees are paid accurately and on time with precise payroll administration.",
    features: [
      "Quickly determine payroll calculations and deductions",
      "Generate accurate Payslips",
      "Using payroll management to plan future costs",
      "Secure Data’s and Privacy",
    ],
    image: assets.payroll,
  },
  {
    id: 3,
    title: "TIME AND ATTENDANCE",
    description:
      "Allow time for greatness and unlock higher productivity through our integrated and advanced time and attendance management system. Similarly create a digitally seamless onboarding experience so that shortens the new employees’ time to productivity.Then set them up for success and build delightful employee journeys from day one.",
    features: [
      "Enhanced employee accountability",
      "Accurate payroll processing",
      "Flexible, instantaneous attendance recording",
      "Attendance policies that are transparent and consistent",
    ],
    image: assets.attendance,
  },
];


const testimonials = [
  {id: 1, image: '' , name: }
]

export {
  generateRandomBankAccount,
  dashboardRouteTitles,
  services,
  hrSolutions,
};
