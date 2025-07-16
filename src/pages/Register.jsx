import { useForm } from "react-hook-form";
import axios from "axios";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hook/useAuth";
import { updateProfile } from "firebase/auth";
import auth from "../config/firebase";
import { getIdToken } from "firebase/auth";
import PasswordShowToggle from "../components/PasswordShowToggle";
import SocialLogin from "../components/SocialLogin";

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [isImageUpload, setisImageUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const checkRole = watch("role");

  const { createUser } = useAuth();

  const onSubmit = async (data) => {
    const { email, password, name, image } = data;

    if (!image) return toast.error("Image is required");

    setLoading(true);
    try {
      // firebase authentication;
      const userCredential = await createUser({ email, password });

      // send extra info to firebase;
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: image,
      });
      const user = auth.currentUser;

      // send info to the database;
      const userInfo = {
        name: data.name,
        email: data.email,
        role: data.role,
        uid: user.uid,
        isVerified: checkRole === "hr" ? true : false,
        isFired: false,
        bank_account_no: data.bank_account_no,
        designation: data.designation,
        salary: data.salary,
        image: data.image,
      };

      await axios.post(
        "https://employee-management-server-ebon.vercel.app/web/api/users/register",
        userInfo
      );

      // send an api request for jwt token
      const token = await getIdToken(user);
      await axios.post(
        "https://employee-management-server-ebon.vercel.app/web/api/auth",
        {},
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      toast.success("Register successfully");
      window.location.reload();
    } catch (err) {
      if (auth.currentUser) {
        await auth.currentUser.delete();
      }

      switch (err.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already in use.");
          break;
        case "auth/invalid-email":
          toast.error("Please provide a valid email address.");
          break;
        case "auth/weak-password":
          toast.error(
            "Password is too weak. It must be at least 6 characters long."
          );
          break;
        default:
          toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
      reset();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    setPreview(URL.createObjectURL(file));

    setisImageUpload(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const imgbApiKey = import.meta.env.VITE_IMGB_API_KEY;
      const url = `https://api.imgbb.com/1/upload?key=${imgbApiKey}`;

      const response = await axios.post(url, formData);
      const imageUrl = response.data.data.url;
      setValue("image", imageUrl);
    } catch (error) {
      toast.error("Image upload failed", error.message);
    } finally {
      setisImageUpload(false);
    }
  };

  return (
    <div className="flex flex-col dark:bg-gray-900 items-center justify-center p-5 md:p-8">
      <div className="pb-[35px]">
        <h2 className="text-[#212529] dark:text-white text-[25px] text-center sm:text-3xl font-secondary mt-2 font-semibold">
          Join WorkSync as an Employee or HR
        </h2>
      </div>
      <div className="w-full max-w-md mx-auto p-5 sm:p-8 rounded border dark:bg-gray-700">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full  bg-white dark:bg-gray-700  space-y-4"
        >
          <label className="cursor-pointer">
            <img
              className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-full"
              src={preview || assets.uploadIcon}
              alt=""
            />
            <input onChange={handleImageChange} type="file" hidden />
          </label>
          <input
            placeholder="Full Name"
            {...register("name", { required: true })}
            className="w-full border px-4 py-2 rounded focus:outline-none dark:bg-gray-900"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}

          <input
            placeholder="Email Address"
            type="email"
            {...register("email", { required: true })}
            className="w-full border px-4 py-2 rounded focus:outline-none dark:bg-gray-900"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          <div>
            <div className="relative">
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  validate: {
                    hasUpper: (v) =>
                      /[A-Z]/.test(v) || "Must contain uppercase",
                    hasSpecial: (v) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                      "Must contain special character",
                  },
                })}
                className="w-full border px-4 py-2 rounded focus:outline-none dark:bg-gray-900"
              />

              {/* Toggle Button */}
              <PasswordShowToggle
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message || "Password invalid"}
              </p>
            )}
          </div>

          <input
            maxLength={13}
            minLength={10}
            placeholder="Bank Account No"
            {...register("bank_account_no", { required: true })}
            className="w-full border px-4 py-2 rounded focus:outline-none dark:bg-gray-900"
          />
          {errors.bank_account_no && (
            <p className="text-red-500 text-sm">Bank Account No is required</p>
          )}

          <input
            placeholder="Salary"
            type="number"
            {...register("salary", { required: true })}
            className="w-full border px-4 py-2 rounded focus:outline-none dark:bg-gray-900"
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">Salary is required</p>
          )}

          <input
            placeholder="Designation (e.g., Sales Assistant)"
            {...register("designation", { required: true })}
            className="w-full border px-4 py-2 rounded focus:outline-none dark:bg-gray-900"
          />
          {errors.designation && (
            <p className="text-red-500 text-sm">Designation is required</p>
          )}

          <select
            {...register("role", { required: true })}
            className="w-full border px-4 py-2 rounded focus:outline-none dark:bg-gray-900"
            defaultValue=""
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">Role is required</p>
          )}

          <button
            disabled={isImageUpload || loading}
            type="submit"
            className="w-full font-semibold text-lg bg-[#035fcb] text-white py-2 rounded hover:bg-[#3769DA] transition-colors"
          >
            {isImageUpload
              ? "Uploading image..."
              : loading
              ? "Creating account..."
              : "Register"}
          </button>
        </form>
        <p className="text-center my-1 text-sm font-medium">or</p>
        <SocialLogin>Register with Google</SocialLogin>
        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
