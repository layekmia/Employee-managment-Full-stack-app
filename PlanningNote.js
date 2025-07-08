// Data from user while Register;
{
  "uid": "user-unique-id",
  "name": "Full Name",
  "email": "email@example.com",
  "role": "employee" | "hr" | "admin",
  "bank_account_no": "1234567890",
  "salary": 30000,
  "designation": "Sales Assistant",
  "photo_url": "https://imgbb.com/photo-url",
  "isVerified": false,   // for employees (default false)
  "fired": false,       // for admin control, to block login
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// workflow collection data 
{
  "id": "workflow-id",
  "employee_uid": "user-unique-id",
  "task": "Sales",
  "hours_worked": 5,
  "date": "2025-07-08",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// payments Collection (Payroll history)
{
  "id": "payment-id",
  "employee_uid": "user-unique-id",
  "month": 7,
  "year": 2025,
  "amount": 30000,
  "transaction_id": "txn_abc123",
  "payment_date": "2025-07-10",
  "approved": true
}

// payroll_requests Collection (HR payment requests to Admin)
{
  "id": "request-id",
  "employee_uid": "user-unique-id",
  "month": 7,
  "year": 2025,
  "salary": 30000,
  "status": "pending" | "paid" | "rejected",
  "requested_by": "hr-uid",
  "approved_by": "admin-uid",
  "payment_date": "timestamp"
}

// contact_messages Collection
{
  "id": "msg-id",
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "message": "Message content",
  "createdAt": "timestamp"
}

/*


project-root/
│
├── public/
│   └── assets/                 # images, icons, logos, uploads
│
├── src/
│   ├── api/                   # API calls & Firebase config
│   │   ├── auth.js            # auth methods (signup, login, logout)
│   │   ├── users.js           # user related APIs
│   │   ├── workflows.js       # task CRUD APIs
│   │   ├── payments.js        # payment APIs
│   │   ├── payrollRequests.js # payroll approval APIs
│   │   └── contact.js         # contact us form API
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PrivateRoute.jsx   # role based route guarding
│   │   ├── WorkflowForm.jsx
│   │   ├── WorkflowTable.jsx
│   │   ├── PaymentModal.jsx
│   │   ├── EmployeeListTable.jsx
│   │   ├── UserPhotoDropdown.jsx
│   │   └── ...others
│   │
│   ├── contexts/               # React contexts for auth & user state
│   │   ├── AuthContext.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── WorkSheet.jsx       # Employee tasks page
│   │   ├── PaymentHistory.jsx  # Employee payment history
│   │   ├── EmployeeList.jsx    # HR page with employee info
│   │   ├── EmployeeDetails.jsx # HR detailed employee page with chart
│   │   ├── Progress.jsx        # HR page with filters on workflows
│   │   ├── AllEmployeeList.jsx # Admin all verified employees
│   │   ├── Payroll.jsx         # Admin payment approval
│   │   ├── ContactUs.jsx
│   │   └── NotFound.jsx
│   │
│   ├── utils/                  # Helper functions (validation, formatters)
│   │   ├── validators.js
│   │   └── dateUtils.js
│   │
│   ├── styles/                 # Tailwind overrides or custom CSS
│   └── App.jsx
│
├── .env                       # environment variables (Firebase keys)
├── tailwind.config.js
├── package.json
└── README.md

*/