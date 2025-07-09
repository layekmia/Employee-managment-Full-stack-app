import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import auth from "../config/firebase";
import useAuth from "../hook/useAuth";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import PasswordShowToggle from "../components/PasswordShowToggle";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      //  Check user existence in my backend
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
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 md:p-8 min-h-screen">
      <div className="pb-5 mb-2">
        <img
          src={assets.logo}
          alt="logo"
          className="w-[45px] h-[25px] mx-auto"
        />
        <h2 className="text-[#212529] text-[25px] sm:text-3xl font-secondary mt-2 font-semibold">
          Log into Your WorkSync
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto bg-white p-5 sm:p-8 rounded-lg shadow space-y-4"
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
          className="w-full bg-secondary text-white py-2 rounded hover:bg-opacity-80"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-sm text-center space-y-2">
          <Link to="/forgot-password" className="text-primary underline">
            Forgot Password?
          </Link>
          <br />
          <span>Don't have an account?</span>{" "}
          <Link to="/register" className="text-primary underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
