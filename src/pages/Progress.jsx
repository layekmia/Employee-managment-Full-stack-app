import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";

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

  console.log(workRecords)

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Work Records</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Employee Filter */}
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-between w-48 px-4 py-2 bg-gray-200 rounded">
              {selectedEmployee ? selectedEmployee.name : "All Employees"}
              <ChevronDownIcon className="ml-2 w-4 h-4" />
            </Menu.Button>
            <Menu.Items className="absolute mt-2 w-48 bg-white rounded shadow z-10">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`w-full px-4 py-2 text-left ${
                      active && "bg-gray-100"
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
                        active && "bg-gray-100"
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
            <Menu.Button className="inline-flex justify-between w-48 px-4 py-2 bg-gray-200 rounded">
              {selectedMonth}
              <ChevronDownIcon className="ml-2 w-4 h-4" />
            </Menu.Button>
            <Menu.Items className="absolute mt-2 w-48 bg-white rounded shadow z-10">
              {months.map((month) => (
                <Menu.Item key={month}>
                  {({ active }) => (
                    <button
                      className={`w-full px-4 py-2 text-left ${
                        active && "bg-gray-100"
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

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-left">Task</th>
                <th className="px-4 py-3 text-left">Hours Worked</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {workRecords.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No records found.
                  </td>
                </tr>
              ) : (
                workRecords.map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{record.employeeName}</td>
                    <td className="px-4 py-2">{record.task}</td>
                    <td className="px-4 py-2">{record.hours}</td>
                    <td className="px-4 py-2">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
