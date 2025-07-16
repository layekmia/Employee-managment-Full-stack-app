import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hook/useAuth";
import { toast } from "react-toastify";
import PasswordShowToggle from "../components/PasswordShowToggle";
import SocialLogin from "../components/SocialLogin";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { signInUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      //   //  Check user existence in my backend
      const { data: userData } = await axios.get(
        `http://localhost:3000/web/api/users/${data.email}`
      );
      if (!userData) {
        toast.error("Account does not exist please enter valid credential");
        return;
      } else if (userData.isFired) {
        toast.error("You have been fired you can't login");
        return;
      }

      //Sign in user using Firebase
      const userCredential = await signInUser({
        email: data.email,
        password: data.password,
      });

      const token = await userCredential.user.getIdToken();
      //Send Firebase token to my backend to get JWT
      await axios.post(
        "http://localhost:3000/web/api/auth",
        {},
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      toast.success("successfully login");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 md:p-8">
      <div className="pb-[35px]">
        <h2 className="text-[#212529] dark:text-white font-secondary text-[25px] sm:text-3xl mt-2 font-semibold">
          Log into Your WorkSync
        </h2>
      </div>
      <div className="max-w-md mx-auto p-5 sm:p-8 rounded border w-full bg-white dark:bg-gray-900 dark:border-gray-700">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
            Login here
          </h2>

          <input
            placeholder="Email Address"
            type="email"
            {...register("email", { required: true })}
            className="w-full border px-4 py-2 rounded focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          <div className="relative">
            <input
              placeholder="Password"
              type={`${showPassword ? "text" : "password"}`}
              {...register("password", { required: true })}
              className="w-full border px-4 py-2 rounded focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            <PasswordShowToggle
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full font-semibold text-lg bg-[#035fcb] dark:bg-blue-600 text-white py-2 rounded hover:bg-[#3769DA] dark:hover:bg-blue-700 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center font-medium text-sm my-1 text-gray-700 dark:text-gray-300">
          or
        </p>

        <div className="space-y-1 mt-2">
          <SocialLogin />
          <div className="text-sm text-center text-gray-700 dark:text-gray-300">
            <Link
              to="/forgot-password"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-sm text-center text-gray-700 dark:text-gray-300">
            <span>Don't have an account?</span>{" "}
            <Link
              to="/auth/register"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
