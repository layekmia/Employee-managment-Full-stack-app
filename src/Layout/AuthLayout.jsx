import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

export default function AuthLayout() {
  return (
    <div className="">
        <div className="pt-5 max-w-[1220px] mx-auto pl-5 mb-5">
            <Logo/>
        </div>
        <main className="min-h-screen">
            <Outlet/>
        </main>
    </div>
  );
}