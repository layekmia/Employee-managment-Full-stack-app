import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { generateRandomBankAccount } from "../utils/helper";
import { toast } from "react-toastify";
import auth from "../config/firebase";

export default function SocialLogin() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();
      const bankAccount = generateRandomBankAccount();

      // 1️⃣ Check if the user already exists
      const res = await axios.get(
        `https://employee-management-server-ebon.vercel.app/web/api/users/${user.email}/check-exist`
      );

      const userExists = res.data.exists;

      if (!userExists) {
        const userInfo = {
          name: user.displayName || "No Name",
          email: user.email,
          role: "employee",
          uid: user.uid,
          isVerified: false,
          isFired: false,
          bank_account_no: bankAccount,
          designation: "junior executive",
          salary: 20000,
          image: user.photoURL,
        };

        await axios.post(
          "https://employee-management-server-ebon.vercel.app/web/api/users/register",
          userInfo
        );
      }

      // 3️⃣ Get JWT token from your backend
      await axios.post(
        "https://employee-management-server-ebon.vercel.app/web/api/auth",
        {},
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      toast.success("successfully login");
    } catch (error) {
      toast.error(
        `Google Login Error: ${
          error.response ? error.response.data : error.message
        }`
      );
    }
  };

  return (
    <div className="text-center w-full">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>
    </div>
  );
}
