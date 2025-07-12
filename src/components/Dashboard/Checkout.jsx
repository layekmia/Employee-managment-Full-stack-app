import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout({ setIsOpen, selectedEmployee, refetch }) {
  return (
    <Elements stripe={stripePromise}>
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-50">
        <PaymentForm
          setIsOpen={setIsOpen}
          selectedEmployee={selectedEmployee}
          refetch={refetch}
        />
      </div>
    </Elements>
  );
}
