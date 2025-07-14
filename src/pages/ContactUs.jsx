import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.post("/contact", data);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h2 className="text-3xl font-bold text-center text-blue-600">
        ✉ Contact Us
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Company Info */}
        <div className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">Our Office</h3>
          <p>
            WorkSync HQ <br />
            123 Innovation Street, <br />
            Dhaka, Bangladesh
          </p>
          <p>📧 Email: support@worksync.com</p>
          <p>📞 Phone: +880 1234-567890</p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-sm">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Message</label>
            <textarea
              rows="5"
              {...register("message", { required: true })}
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">Message is required</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
          >
            {loading ? 'sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
