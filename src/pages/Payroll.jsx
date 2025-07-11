import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";

export default function PayrollPage() {
  const queryClient = useQueryClient();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      const res = await axiosInstance.get("admin/employees/payment-requests");
      return res.data.payments;
    },
  });

  const { mutateAsync: paySalary, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post(`/payments/pay/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Payment successful!");
      queryClient.invalidateQueries(["payroll"]);
    },
    onError: () => toast.error("Payment failed!"),
  });

  const handlePay = async (paymentId) => {
    await paySalary(paymentId);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Payroll Management</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Month</th>
            <th>Year</th>
            <th>Payment Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="hover:bg-gray-50">
              <td>{payment.employeeName}</td>
              <td>${payment.salary}</td>
              <td>{payment.month}</td>
              <td>{payment.year}</td>
              <td>{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "Not Paid"}</td>
              <td>
                <button
                  onClick={() => handlePay(payment._id)}
                  disabled={payment.paymentStatus === "Paid"}
                  className={`px-3 py-1 rounded ${
                    payment.paymentStatus === "Paid" ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {payment.paymentStatus === "Paid" ? "Paid" : isPending ? "Paying..." : "Pay"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
