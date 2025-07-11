import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";
import PayModal from "../components/Dashboard/PayModal";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const {
    data: employees = [],
    isLoading: employeeLoading,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosInstance.get("/employees");
      return res.data;
    },
  });

  const {
    data: monthlyPayments = [],
    isLoading: paymentLoading,
    error,
  } = useQuery({
    queryKey: ["monthlyPayments"],
    queryFn: async () => {
      const today = new Date();
      const month = today.toLocaleString("default", { month: "long" }); // July
      const year = today.getFullYear();

      const res = await axiosInstance.get(
        `/payments/monthly?month=${month}&year=${year}`
      );
      return res.data;
    },
  });

  console.log(monthlyPayments);
  console.log(error);

  const [openPayModal, setOpenPayModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate()

  const handleVerify = async (user) => {
    try {
      await axiosInstance.patch(`/employee/${user._id}/verify`, {
        isVerified: !user.isVerified,
      });
      if (user.isVerified) {
        toast.warn(`${user.name} is Unverified`);
      } else {
        toast.success(`now MR ${user.name} is verified`);
      }
      refetch();
    } catch (error) {
      toast.error("Employee verify to failed", error.message);
    }
  };

  const handlePay = (user) => {
    setSelectedUser(user);
    setOpenPayModal(true);
  };
  const onClose = () => {
    setOpenPayModal(false);
  };

  if (employeeLoading || paymentLoading)
    return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Verified</th>
              <th className="px-4 py-3">Bank Account</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3 text-center">Payment</th>
              <th className="px-4 py-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {employees.map((employee, index) => {
              const isPaid = monthlyPayments.some(
                (payment) => payment.employeeId === employee._id
              );

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="text-xl"
                      onClick={() => handleVerify(employee)}
                    >
                      {employee.isVerified ? "✅" : "❌"}
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    {employee.bank_account_no || "N/A"}
                  </td>
                  <td className="px-4 py-2">{employee.salary || "N/A"}</td>
                  <td className="px-4 py-2 flex items-center justify-center">
                    <button
                      onClick={() => handlePay(employee)}
                      className={`${
                        isPaid || !employee.isVerified
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white px-3 py-1 rounded`}
                      disabled={isPaid || !employee.isVerified}
                    >
                      {isPaid ? "Paid" : "Pay"}
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button onClick={() => navigate(`/dashboard/employee-list/${employee._id}`)} className="py-1 px-3 bg-blue-600 text-white rounded">
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {openPayModal && (
        <PayModal user={selectedUser} onClose={onClose} refetch={refetch} />
      )}
    </div>
  );
}
