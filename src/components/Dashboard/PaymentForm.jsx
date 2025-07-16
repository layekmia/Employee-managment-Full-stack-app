import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

export default function PaymentForm({ setIsOpen, selectedEmployee, refetch }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is not loaded. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    const card = elements.getElement(CardElement);

    try {
      // 1. Create payment method
      const { error: paymentError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (paymentError) {
        setError(paymentError.message);
        return;
      }

      // 2. Create payment intent from backend
      const { data } = await axiosInstance.post(
        "/payments/create-payment-intent",
        { amount: selectedEmployee.salary }
      );
      const clientSecret = data.clientSecret;

      // 3. Confirm the payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user.name.split(" ").join("").toLowerCase(),
              email: user.email,
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const transactionId = paymentIntent.id;
        const paymentData = {
          transactionId,
          date: new Date().toISOString(),
        };

        try {
          await axiosInstance.patch(
            `/payments/${selectedEmployee._id}/update-payment-status`,
            paymentData
          );
          toast.success("Payment successful");
          setIsOpen(false);
          refetch();
        } catch (dbError) {
          setError("Payment done, but failed to save in database.");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-xl mt-10 p-6">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6 font-secondary uppercase dark:text-gray-300">
          Payment Details
        </h2>
        <div className="bg-gray-50 border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md p-4 mb-6">
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <span className="font-semibold mr-2">Name:</span>{" "}
              {selectedEmployee.employeeName}
            </p>
            <p>
              <span className="font-semibold mr-2">Email:</span>{" "}
              {selectedEmployee.employeeEmail}
            </p>
            <p>
              <span className="font-semibold mr-2">Designation:</span>{" "}
              {selectedEmployee.designation}
            </p>
            <p className="capitalize">
              <span className="font-semibold mr-2">Month:</span>
              {selectedEmployee.month}
            </p>
            <p>
              <span className="font-semibold mr-2">Salary:</span>
              {selectedEmployee.salary} TK
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border p-3 rounded-md bg-white dark:bg-gray-900 dark:border-gray-500 shadow-inner">
            <CardElement className="p-2" />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!stripe || !elements || loading}
              className={`inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all ${
                (!stripe || !elements || loading) &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Processing..." : `Pay ${selectedEmployee.salary} TK`}
            </button>
          </div>

          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
