import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      //   //  Check user existence in my backend
      const { data: userData } = await axios.get(
        `https://employee-management-server-ebon.vercel.app/web/api/users/${data.email}`
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
        "https://employee-management-server-ebon.vercel.app/web/api/auth",
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
        <h2 className="text-[#212529] font-secondary text-[25px] sm:text-3xl mt-2 font-semibold">
          Log into Your WorkSync
        </h2>
      </div>
      <div className="max-w-md mx-auto p-5 sm:p-8 rounded border w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full  bg-white  space-y-4"
        >
          <h2 className="text-xl font-semibold text-center">Login here</h2>

          <input
            placeholder="Email Address"
            type="email"
            {...register("email", { required: true })}
            className="w-full border px-4 py-2 rounded focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          <div className="relative">
            <input
              placeholder="Password"
              type={`${showPassword ? "text" : "password"}`}
              {...register("password", { required: true })}
              className="w-full border px-4 py-2 rounded focus:outline-none"
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
            className="w-full font-semibold text-lg bg-[#035fcb] text-white py-2 rounded hover:bg-[#3769DA] transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center font-medium text-sm my-1">or</p>
        <div className="space-y-1 mt-2">
          <SocialLogin />
          <div>
            <div className="text-sm text-center">
              <Link to="/forgot-password" className="text-primary underline">
                Forgot Password?
              </Link>
            </div>
            <span>Don't have an account?</span>{" "}
            <Link to="/auth/register" className="text-primary underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
