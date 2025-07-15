import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { months } from "../../utils/helper";

export default function PayModal({ user, onClose, refetch }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: user.salary,
      month: "",
      year: new Date().getFullYear(),
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const paymentData = {
      employeeId: user._id,
      employeeName: user.name,
      employeeEmail: user.email,
      designation: user.designation,
      salary: data.amount,
      bankAccount: user.bank_account_no,
      month: data.month.toLowerCase(),
      year: data.year,
      paymentRequestedBy: "hr",
    };

    try {
      await axiosInstance.post("/payments-request", paymentData);
      toast.success("Payment created!");
      refetch();
      onClose();
      reset();
    } catch (error) {
      toast.error("Failed to create payment", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/50">
        <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-sm space-y-4 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Pay Employee
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Amount
              </label>
              <input
                {...register("amount", { required: true })}
                type="number"
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded focus:outline-none dark:bg-gray-800 dark:text-white"
                disabled={true}
              />
            </div>

            <div>
              <label
                htmlFor="month"
                className="text-sm block mb-1 text-gray-700 dark:text-gray-300"
              >
                Month
              </label>
              <select
                {...register("month", {
                  required: "Month is required",
                })}
                id="month"
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded focus:outline-none dark:bg-gray-800 dark:text-white"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a month
                </option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              {errors.month && (
                <p className="text-red-500 text-sm">{errors.month.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Year
              </label>
              <input
                {...register("year", { required: "Year is required" })}
                type="number"
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded focus:outline-none dark:bg-gray-800 dark:text-white"
              />
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Paying..." : "Pay"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
