import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src={assets.logo} alt="" />
      <h2 className="text-primary text-[25px] font-semibold font-primary">
        WorkSync
      </h2>
    </div>
  );
}
