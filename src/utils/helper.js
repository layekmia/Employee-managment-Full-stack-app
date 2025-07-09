const generateRandomBankAccount = () => {
  const accountNumber = `4235${Math.floor(1000000000 + Math.random() * 9000000000)}`;
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


export {generateRandomBankAccount, dashboardRouteTitles}
