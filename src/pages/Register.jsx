import { useForm } from "react-hook-form";
import axios from "axios";
import { div } from "framer-motion/client";

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://your-api-url/register", data);
      console.log("Registration success:", res.data);
      reset();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      
    </div>
  );
}
