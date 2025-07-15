import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Spinner from "../components/Dashboard/Spinner";
import { FaUserTie, FaUserSlash } from "react-icons/fa";

export default function AdminEmployeeManagement() {
  const queryClient = useQueryClient();
  const [fireModal, setFireModal] = useState({ isOpen: false, userId: null });
  const [salaryUpdate, setSalaryUpdate] = useState({ id: null, value: "" });
  const [view, setView] = useState("table");


  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: async () => {
      const res = await axiosInstance.get("/admin/employees");
      return res.data;
    },
  });

  const makeHR = async (id) => {
    try {
      await axiosInstance.patch(`/admin/employees/${id}/role`, { role: "hr" });
      toast.success("Employee promoted to HR");
      queryClient.invalidateQueries(["allEmployees"]);
    } catch (error) {
      toast.error(`failed to promote ${error.message}`);
    }
  };

  const fireEmployee = async () => {
    try {
      await axiosInstance.patch(`/admin/employees/${fireModal.userId}/fire`);
      toast.error("Employee fired");
      queryClient.invalidateQueries(["allEmployees"]);
    } catch (error) {
      toast.error(`failed to employee fired ${error.message}`);
    } finally {
      setFireModal({ isOpen: false, userId: null });
    }
  };

  const updateSalary = async (id, newSalary) => {
    try {
      await axiosInstance.patch(`/admin/employees/${id}/salary`, {
        salary: newSalary,
      });
      toast.success("Salary updated");
      queryClient.invalidateQueries(["allEmployees"]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-5 shadow rounded">
          <div>
            <h4 className="text-gray-500 text-sm">Active Employees</h4>
            <p className="text-2xl font-bold text-green-600">
              {employees.filter((emp) => !emp.isFired).length}
            </p>
          </div>
          <FaUserTie className="text-4xl text-green-500" />
        </div>

        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-5 shadow rounded">
          <div>
            <h4 className="text-gray-500 text-sm">Fired Employees</h4>
            <p className="text-2xl font-bold text-red-600">
              {employees.filter((emp) => emp.isFired).length}
            </p>
          </div>
          <FaUserSlash className="text-4xl text-red-500" />
        </div>
      </div>
      <div className="flex gap-3 mb-3 justify-center">
        <button
          onClick={() => setView("table")}
          className={`px-4 text-sm font-secondary py-[6px] rounded-md font-medium transition ${
            view === "table"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          Table View
        </button>
        <button
          onClick={() => setView("card")}
          className={`px-4 text-sm font-secondary py-[6px] rounded-md font-medium transition ${
            view === "card"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          Card View
        </button>
      </div>

      {view === "table" ? (
        <div className="overflow-x-auto">
          <Table striped className="min-w-[800px] w-full">
            <TableHead>
              <TableHeadCell className="bg-blue-50">Name</TableHeadCell>
              <TableHeadCell className="bg-blue-50">Designation</TableHeadCell>
              <TableHeadCell className="bg-blue-50">Make HR</TableHeadCell>
              <TableHeadCell className="bg-blue-50">Salary</TableHeadCell>
              <TableHeadCell className="bg-blue-50">Fire</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {employees.map((user) => (
                <TableRow
                  key={user._id}
                  className="hover:bg-gray-50 dark:bg-gray-800"
                >
                  <TableCell className="uppercase font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </TableCell>

                  <TableCell className="uppercase">{user.role}</TableCell>

                  <TableCell>
                    {user.role !== "hr" && !user.isFired ? (
                      <button
                        onClick={() => makeHR(user._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Make HR
                      </button>
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="w-24 border px-2 py-1 rounded text-sm dark:bg-gray-900 dark:border-gray-500"
                        defaultValue={user.salary}
                        onChange={(e) =>
                          setSalaryUpdate({
                            id: user._id,
                            value: Number(e.target.value),
                          })
                        }
                      />
                      <button
                        disabled={user.isFired}
                        onClick={() => {
                          if (salaryUpdate.value > user.salary) {
                            updateSalary(user._id, salaryUpdate.value);
                          } else {
                            toast.error("Cannot decrease salary");
                          }
                        }}
                        className={`${
                          user.isFired && "opacity-40"
                        } ml-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700`}
                      >
                        Update
                      </button>
                    </div>
                  </TableCell>

                  <TableCell>
                    {user.isFired ? (
                      <span className="text-red-500">Fired</span>
                    ) : (
                      <button
                        onClick={() =>
                          setFireModal({ isOpen: true, userId: user._id })
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Fire
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3 lg:gap-5">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm transition"
            >
              {/* Employee Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  className="w-14 h-14 object-cover border-2 border-blue-500 rounded-full"
                  src={employee.image}
                  alt={employee.name}
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {employee.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300 font-medium">
                    {employee.designation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <input
                  type="number"
                  defaultValue={employee.salary}
                  className="w-28 px-3 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  onChange={(e) =>
                    setSalaryUpdate({
                      id: employee._id,
                      value: Number(e.target.value),
                    })
                  }
                />
                <button
                  disabled={employee.isFired}
                  onClick={() => {
                    if (salaryUpdate.value > employee.salary) {
                      updateSalary(employee._id, salaryUpdate.value);
                    } else {
                      toast.error("Cannot decrease salary");
                    }
                  }}
                  className={`${
                    employee.isFired && "opacity-40"
                  } ml-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700`}
                >
                  Update Salary
                </button>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {employee.role !== "hr" && !employee.isFired && (
                  <button
                    onClick={() => makeHR(employee._id)}
                    className="text-sm px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                  >
                    Make HR
                  </button>
                )}

                {employee.isFired ? (
                  <span className="text-red-500 font-medium text-sm">
                    Fired
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      setFireModal({ isOpen: true, userId: employee._id })
                    }
                    className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                  >
                    Fire
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 Fire Confirmation Modal */}
      <Dialog
        open={fireModal.isOpen}
        onClose={() => setFireModal({ isOpen: false, userId: null })}
        className="fixed inset-0 z-50"
      >
        <div className="flex items-center justify-center min-h-screen bg-black/50">
          <Dialog.Panel className="bg-white p-6 rounded space-y-4 max-w-sm">
            <Dialog.Title className="text-lg font-bold">
              Confirm Firing
            </Dialog.Title>
            <p>Are you sure you want to fire this employee?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setFireModal({ isOpen: false, userId: null })}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={fireEmployee}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Fire
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { toast } from "react-toastify";
// import { Dialog } from "@headlessui/react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeadCell,
//   TableRow,
// } from "flowbite-react";
// import Spinner from "../components/Dashboard/Spinner";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const COLORS = ['#4ade80', '#f87171'];

// export default function AdminEmployeeManagement() {
//   const queryClient = useQueryClient();
//   const [fireModal, setFireModal] = useState({ isOpen: false, userId: null });
//   const [salaryUpdate, setSalaryUpdate] = useState({ id: null, value: "" });

//   const { data: employees = [], isLoading } = useQuery({
//     queryKey: ["allEmployees"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/admin/employees");
//       return res.data;
//     },
//   });

//   const makeHR = async (id) => {
//     try {
//       await axiosInstance.patch(`/admin/employees/${id}/role`, { role: "hr" });
//       toast.success("Employee promoted to HR");
//       queryClient.invalidateQueries(["allEmployees"]);
//     } catch (error) {
//       toast.error(`failed to promote ${error.message}`);
//     }
//   };

//   const fireEmployee = async () => {
//     try {
//       await axiosInstance.patch(`/admin/employees/${fireModal.userId}/fire`);
//       toast.error("Employee fired");
//       queryClient.invalidateQueries(["allEmployees"]);
//     } catch (error) {
//       toast.error(`failed to employee fired ${error.message}`);
//     } finally {
//       setFireModal({ isOpen: false, userId: null });
//     }
//   };

//   const updateSalary = async (id, newSalary) => {
//     try {
//       await axiosInstance.patch(`/admin/employees/${id}/salary`, {
//         salary: newSalary,
//       });
//       toast.success("Salary updated");
//       queryClient.invalidateQueries(["allEmployees"]);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   if (isLoading) return <Spinner />;

//   const activeCount = employees.filter(emp => !emp.isFired).length;
//   const firedCount = employees.filter(emp => emp.isFired).length;

//   const data = [
//     { name: "Active", count: activeCount },
//     { name: "Fired", count: firedCount }
//   ];

//   return (
//     <div className="p-6">
//       <div className="w-full md:w-[400px] h-[300px] mx-auto">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={data}
//             innerRadius={60}
//             outerRadius={80}
//             fill="#8884d8"
//             paddingAngle={5}
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend verticalAlign="bottom" height={36} />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>

//       <div className="overflow-x-auto">
//         <Table striped className="min-w-[800px] w-full">
//           <TableHead>
//             <TableHeadCell className="bg-blue-50">Name</TableHeadCell>
//             <TableHeadCell className="bg-blue-50">Designation</TableHeadCell>
//             <TableHeadCell className="bg-blue-50">Make HR</TableHeadCell>
//             <TableHeadCell className="bg-blue-50">Salary</TableHeadCell>
//             <TableHeadCell className="bg-blue-50">Fire</TableHeadCell>
//           </TableHead>

//           <TableBody className="divide-y">
//             {employees.map((user) => (
//               <TableRow
//                 key={user._id}
//                 className="hover:bg-gray-50 dark:bg-gray-800"
//               >
//                 <TableCell className="uppercase font-medium text-gray-900 dark:text-white">
//                   {user.name}
//                 </TableCell>

//                 <TableCell className="uppercase">{user.role}</TableCell>

//                 <TableCell>
//                   {user.role !== "hr" && !user.isFired ? (
//                     <button
//                       onClick={() => makeHR(user._id)}
//                       className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                     >
//                       Make HR
//                     </button>
//                   ) : (
//                     "-"
//                   )}
//                 </TableCell>

//                 <TableCell>
//                   <div className="flex items-center">
//                     <input
//                       type="number"
//                       className="w-24 border px-2 py-1 rounded text-sm"
//                       defaultValue={user.salary}
//                       onChange={(e) =>
//                         setSalaryUpdate({
//                           id: user._id,
//                           value: Number(e.target.value),
//                         })
//                       }
//                     />
//                     <button
//                       onClick={() => {
//                         if (salaryUpdate.value > user.salary) {
//                           updateSalary(user._id, salaryUpdate.value);
//                         } else {
//                           toast.error("Cannot decrease salary");
//                         }
//                       }}
//                       className="ml-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     >
//                       Update
//                     </button>
//                   </div>
//                 </TableCell>

//                 <TableCell>
//                   {user.isFired ? (
//                     <span className="text-red-500">Fired</span>
//                   ) : (
//                     <button
//                       onClick={() =>
//                         setFireModal({ isOpen: true, userId: user._id })
//                       }
//                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       Fire
//                     </button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* 🔥 Fire Confirmation Modal */}
//       <Dialog
//         open={fireModal.isOpen}
//         onClose={() => setFireModal({ isOpen: false, userId: null })}
//         className="fixed inset-0 z-50"
//       >
//         <div className="flex items-center justify-center min-h-screen bg-black/50">
//           <Dialog.Panel className="bg-white p-6 rounded space-y-4 max-w-sm">
//             <Dialog.Title className="text-lg font-bold">
//               Confirm Firing
//             </Dialog.Title>
//             <p>Are you sure you want to fire this employee?</p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setFireModal({ isOpen: false, userId: null })}
//                 className="px-3 py-1 bg-gray-200 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={fireEmployee}
//                 className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Fire
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// }
