import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import auth from "../config/firebase";
import useAuth from "../hook/useAuth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signInUser } = useAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // ✅ First: Check user existence in your backend
      const { data: userData } = await axios.get(
        `http://localhost:3000/api/users/${data.email}`
      );

      if (!userData || userData.isFired) {
        alert("Account does not exist or has been fired");
        return;
      }

      // ✅ Second: Sign in user using Firebase
      const userCredential = await signInUser({
        email: data.email,
        password: data.password,
      });
      const token = await userCredential.user.getIdToken();

      // ✅ Third: Send Firebase token to your backend to get JWT
      await axios.post(
        "http://localhost:3000/api/auth",
        {}, // No body
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Login to WorkSync</h2>

      <input
        placeholder="Email Address"
        type="email"
        {...register("email", { required: true })}
        className="w-full border px-4 py-2 rounded focus:outline-none"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">Email is required</p>
      )}

      <input
        placeholder="Password"
        type="password"
        {...register("password", { required: true })}
        className="w-full border px-4 py-2 rounded focus:outline-none"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">Password is required</p>
      )}

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
  );
}
