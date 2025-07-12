import { assets } from "../assets/assets";

const generateRandomBankAccount = () => {
  const accountNumber = `4235${Math.floor(
    1000000000 + Math.random() * 9000000000
  )}`;
  return accountNumber;
};

const dashboardRouteTitles = {
  "/dashboard/overview": "Overview",
  "/dashboard/work-sheet": "Task Records",
  "/dashboard/payment-history": "Payment History",
  "/dashboard/employee-list": "Employee List",
  "/dashboard/progress": "Progress",
  "/dashboard/all-employee": "Employee Management",
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
  {
    name: 'David Martinez',
    role: 'HR Manager',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.5,
    text: 'Get smarter and more efficient software with features designed to free you from administrative work. Join us and find out why.',
  },
  {
    name: 'Samantha Payne',
    role: 'HR Analyst',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    text: 'It’s easy to use, serves the purpose well with good information. Especially to manage HR tasks, it’s reliable and time-saving.',
  },
  {
    name: 'Albert Flores',
    role: 'Payroll Admin',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5,
    text: 'An absolute game-changer for streamlining HR processes! The app makes managing employees a breeze.',
  },
  {
    name: 'Devon Lane',
    role: 'Chief Executive',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    rating: 4.5,
    text: 'Super intuitive and efficient! This app has simplified every aspect of HR management for our team, saving us so much time.',
  },
  {
    name: 'Samantha payne',
    role: 'Chief Executive',
    image: 'https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2025/01/wol-img2.svg',
    rating: 4.5,
    text: 'Super intuitive and efficient! This app has simplified every aspect of HR management for our team, saving us so much time.',
  },
  {
    name: 'David Martinez',
    role: 'Chief Executive',
    image: 'https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2025/01/wol-img5.svg',
    rating: 4.5,
    text: 'Super intuitive and efficient! This app has simplified every aspect of HR management for our team, saving us so much time.',
  },
];
export {
  generateRandomBankAccount,
  dashboardRouteTitles,
  services,
  hrSolutions,
  testimonials,
};
