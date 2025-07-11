import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Logo({color = 'text-primary'}) {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img className="w-9" src={assets.logo} alt="" />
      <h2 className={`${color} text-2xl font-semibold font-primary`}>
        WorkSync
      </h2>
    </div>
  );
}
