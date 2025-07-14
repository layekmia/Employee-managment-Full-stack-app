// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { Menu } from "@headlessui/react";
// import { ChevronDownIcon } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeadCell,
//   TableRow,
// } from "flowbite-react";
// import Spinner from "../components/Dashboard/Spinner";

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// export default function Progress() {
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState(
//     new Date().toLocaleString("default", { month: "long" })
//   );

//   const { data: employees = [] } = useQuery({
//     queryKey: ["employees"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/employees");
//       return res.data;
//     },
//   });

//   console.log(employees);

//   const { data: workRecords = [], isLoading } = useQuery({
//     queryKey: ["workRecords", selectedEmployee, selectedMonth],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/employee-task", {
//         params: {
//           employeeId: selectedEmployee?._id,
//           month: selectedMonth,
//         },
//       });
//       return res.data;
//     },
//   });

//   return (
//     <div className="">
//       <h2 className="text-xl font-bold mb-4 text-gray-700 font-secondary">
//         See Work Records
//       </h2>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         {/* Employee Filter */}
//         <div>
//           <Menu as="div" className="relative inline-block text-left">
//             <Menu.Button className="inline-flex items-center justify-between w-48 px-4 py-2 bg-white border-2 border-gray-100 rounded focus:outline-none">
//               {selectedEmployee ? selectedEmployee.name : "All Employees"}
//               <ChevronDownIcon className="ml-2 w-5 h-4" />
//             </Menu.Button>

//             <Menu.Items className="absolute mt-1 w-48 bg-white shadow-lg rounded z-50 max-h-60 overflow-y-auto focus:outline-none">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={`w-full px-4 py-2 text-left ${
//                       active ? "bg-gray-100" : ""
//                     }`}
//                     onClick={() => setSelectedEmployee(null)}
//                   >
//                     All Employees
//                   </button>
//                 )}
//               </Menu.Item>
//               {employees.map((emp) => (
//                 <Menu.Item key={emp._id}>
//                   {({ active }) => (
//                     <button
//                       className={`w-full px-4 py-2 text-left ${
//                         active ? "bg-gray-100" : ""
//                       }`}
//                       onClick={() => setSelectedEmployee(emp)}
//                     >
//                       {emp.name}
//                     </button>
//                   )}
//                 </Menu.Item>
//               ))}
//             </Menu.Items>
//           </Menu>
//         </div>

//         {/* Month Filter */}
//         <div>
//           <Menu as="div" className="relative inline-block text-left">
//             <Menu.Button className="inline-flex items-center justify-between w-48 px-4 py-2 bg-white border-2 border-gray-200 rounded focus:outline-none">
//               {selectedMonth}
//               <ChevronDownIcon className="ml-2 w-5 h-4" />
//             </Menu.Button>

//             <Menu.Items className="absolute mt-1 w-48 bg-white shadow-lg rounded z-50 max-h-60 overflow-y-auto focus:outline-none">
//               {months.map((month) => (
//                 <Menu.Item key={month}>
//                   {({ active }) => (
//                     <button
//                       className={`w-full px-4 py-2 text-left ${
//                         active ? "bg-gray-100" : ""
//                       }`}
//                       onClick={() => setSelectedMonth(month)}
//                     >
//                       {month}
//                     </button>
//                   )}
//                 </Menu.Item>
//               ))}
//             </Menu.Items>
//           </Menu>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         {isLoading ? (
//           <Spinner />
//         ) : (
//           <div className="overflow-x-auto">
//             <Table striped>
//               <TableHead>
//                 <TableHeadCell className="bg-blue-50">Employee</TableHeadCell>
//                 <TableHeadCell className="bg-blue-50">Task</TableHeadCell>
//                 <TableHeadCell className="bg-blue-50">
//                   Hours Worked
//                 </TableHeadCell>
//                 <TableHeadCell className="bg-blue-50">Date</TableHeadCell>
//               </TableHead>

//               <TableBody className="divide-y">
//                 {workRecords.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan="4"
//                       className="text-center py-4 text-base font-semibold font-secondary"
//                     >
//                       No records found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   workRecords.map((record) => (
//                     <TableRow
//                       key={record._id}
//                       className="bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
//                     >
//                       <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                         {record.employeeName}
//                       </TableCell>
//                       <TableCell className="font-medium font-secondary">
//                         {record.task}
//                       </TableCell>
//                       <TableCell className="font-medium text-green-600">
//                         {record.hours}h
//                       </TableCell>
//                       <TableCell className="font-medium">
//                         {new Date(record.date).toLocaleDateString()}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Card,
} from "flowbite-react";
import Spinner from "../components/Dashboard/Spinner";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Progress() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosInstance.get("/employees");
      return res.data;
    },
  });

  const { data: workRecords = [], isLoading } = useQuery({
    queryKey: ["workRecords", selectedEmployee, selectedMonth],
    queryFn: async () => {
      const res = await axiosInstance.get("/employee-task", {
        params: {
          employeeId: selectedEmployee?._id,
          month: selectedMonth,
        },
      });
      return res.data;
    },
  });

  // Total hours calculation
  const totalHours = useMemo(() => {
    return workRecords.reduce((sum, record) => sum + record.hours, 0);
  }, [workRecords]);

  return (
    <div className="">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Employee Filter */}
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center justify-between w-48 px-4 py-2 bg-white dark:bg-gray-800 dark:text-gray-300 border-2 border-gray-100 dark:border-gray-500 rounded focus:outline-none">
              {selectedEmployee ? selectedEmployee.name : "All Employees"}
              <ChevronDownIcon className="ml-2 w-5 h-4" />
            </Menu.Button>

            <Menu.Items className="absolute mt-1 w-48 bg-white dark:bg-gray-600 dark:text-white shadow-lg rounded z-50 max-h-60 overflow-y-auto focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`w-full px-4 py-2 text-left ${
                      active ? "bg-gray-100 dark:bg-gray-900" : ""
                    }`}
                    onClick={() => setSelectedEmployee(null)}
                  >
                    All Employees
                  </button>
                )}
              </Menu.Item>
              {employees.map((emp) => (
                <Menu.Item key={emp._id}>
                  {({ active }) => (
                    <button
                      className={`w-full px-4 py-2 text-left ${
                        active ? "bg-gray-100 dark:bg-gray-900" : ""
                      }`}
                      onClick={() => setSelectedEmployee(emp)}
                    >
                      {emp.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>

        {/* Month Filter */}
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center justify-between w-48 px-4 py-2 bg-white dark:bg-gray-800 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-500 rounded focus:outline-none">
              {selectedMonth}
              <ChevronDownIcon className="ml-2 w-5 h-4" />
            </Menu.Button>

            <Menu.Items className="absolute mt-1 w-48 dark:bg-gray-600 dark:text-white bg-white shadow-lg rounded z-50 max-h-60 overflow-y-auto focus:outline-none">
              {months.map((month) => (
                <Menu.Item key={month}>
                  {({ active }) => (
                    <button
                      className={`w-full px-4 py-2 text-left ${
                        active ? "bg-gray-100 dark:bg-gray-900" : ""
                      }`}
                      onClick={() => setSelectedMonth(month)}
                    >
                      {month}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
      </div>

      {/* Total Hours Summary */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-l-4 border-blue-600 shadow-sm">
          <h4 className="text-gray-500 text-sm font-medium mb-1">
            Total Hours Worked
          </h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">
            {totalHours} hrs
          </p>
          <p className="text-sm text-gray-400">
            {selectedEmployee?.name || "All Employees"} in {selectedMonth}
          </p>
        </Card>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto">
            <Table striped>
              <TableHead>
                <TableHeadCell className="bg-blue-50">Employee</TableHeadCell>
                <TableHeadCell className="bg-blue-50">Task</TableHeadCell>
                <TableHeadCell className="bg-blue-50">
                  Hours Worked
                </TableHeadCell>
                <TableHeadCell className="bg-blue-50">Date</TableHeadCell>
              </TableHead>

              <TableBody className="divide-y">
                {workRecords.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan="4"
                      className="text-center py-4 text-base font-semibold font-secondary"
                    >
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  workRecords.map((record) => (
                    <TableRow
                      key={record._id}
                      className="bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {record.employeeName}
                      </TableCell>
                      <TableCell className="font-medium font-secondary">
                        {record.task}
                      </TableCell>
                      <TableCell className="font-medium text-green-600 dark:text-green-400">
                        {record.hours}h
                      </TableCell>
                      <TableCell className="font-medium">
                        {new Date(record.date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
