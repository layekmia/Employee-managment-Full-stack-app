import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";



export default function AdminEmployeeManagement() {
  const queryClient = useQueryClient();
  const [fireModal, setFireModal] = useState({ isOpen: false, userId: null });
  const [salaryUpdate, setSalaryUpdate] = useState({ id: null, value: "" });

  console.log(salaryUpdate);

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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
      <Table striped>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Designation</TableHeadCell>
          <TableHeadCell>Make HR</TableHeadCell>
          <TableHeadCell>Salary</TableHeadCell>
          <TableHeadCell>Fire</TableHeadCell>
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
                    className="w-24 border px-2 py-1 rounded text-sm"
                    defaultValue={user.salary}
                    onChange={(e) =>
                      setSalaryUpdate({
                        id: user._id,
                        value: Number(e.target.value),
                      })
                    }
                  />
                  <button
                    onClick={() => {
                      if (salaryUpdate.value > user.salary) {
                        updateSalary(user._id, salaryUpdate.value);
                      } else {
                        toast.error("Cannot decrease salary");
                      }
                    }}
                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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
