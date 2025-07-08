import { useForm } from "react-hook-form";
import axios from "axios";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hook/useAuth";
import { updateProfile } from "firebase/auth";
import auth from "../config/firebase";
import { getIdToken } from "firebase/auth";

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [isImageUpload, setisImageUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  const { createUser } = useAuth();

  const onSubmit = async (data) => {
    const { email, password, name, image } = data;

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
        isVerified: false,
        isFired: false,
        bank_account_no: data.bank_account_no,
        designation: data.designation,
        salary: data.salary,
        image: data.image,
      };

      await axios.post("http://localhost:3000/web/api/user/register", userInfo);

      // send an api request for jwt token
      const token = await getIdToken(user);
      await axios.post(
        "http://localhost:3000/web/api/auth",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Register successfully");
    } catch (err) {
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
    }

    // try {
    //   const res = await axios.post("https://your-api-url/register", data);
    //   console.log("Registration success:", res.data);
    //   reset();
    // } catch (error) {
    //   console.error("Registration failed:", error);
    // }
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
      console.log(imageUrl);
    } catch (error) {
      toast.error("Image upload failed", error.message);
      console.log(error);
    } finally {
      setisImageUpload(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="pb-5 mb-2">
        <img
          src={assets.logo}
          alt="logo"
          className="w-[45px] h-[25px] mx-auto"
        />
        <h2 className="text-[#212529] text-3xl font-secondary mt-2 font-semibold">
          Join WorkSync as an Employee or HR
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto  bg-white p-8 rounded-lg shadow space-y-4"
      >
        <label className="cursor-pointer">
          <img
            className="w-14 h-14 object-cover rounded-full"
            src={preview || assets.uploadIcon}
            alt=""
          />
          <input onChange={handleImageChange} type="file" hidden />
        </label>
        <input
          placeholder="Full Name"
          {...register("name", { required: true })}
          className="w-full border px-4 py-2 rounded focus:outline-none"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">Name is required</p>
        )}

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
          {...register("password", {
            required: true,
            minLength: 6,
            validate: {
              hasUpper: (v) => /[A-Z]/.test(v) || "Must contain uppercase",
              hasSpecial: (v) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                "Must contain special character",
            },
          })}
          className="w-full border px-4 py-2 rounded focus:outline-none"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message || "Password invalid"}
          </p>
        )}

        <input
          placeholder="Bank Account No"
          {...register("bank_account_no", { required: true })}
          className="w-full border px-4 py-2 rounded focus:outline-none"
        />
        {errors.bank_account_no && (
          <p className="text-red-500 text-sm">Bank Account No is required</p>
        )}

        <input
          placeholder="Salary"
          type="number"
          {...register("salary", { required: true })}
          className="w-full border px-4 py-2 rounded focus:outline-none"
        />
        {errors.salary && (
          <p className="text-red-500 text-sm">Salary is required</p>
        )}

        <input
          placeholder="Designation (e.g., Sales Assistant)"
          {...register("designation", { required: true })}
          className="w-full border px-4 py-2 rounded focus:outline-none"
        />
        {errors.designation && (
          <p className="text-red-500 text-sm">Designation is required</p>
        )}

        <select
          {...register("role", { required: true })}
          className="w-full border px-4 py-2 rounded focus:outline-none"
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
          className="w-full bg-secondary text-white py-2 rounded hover:bg-opacity-80"
        >
          {isImageUpload
            ? "Uploading image..."
            : loading
            ? "Creating account..."
            : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
