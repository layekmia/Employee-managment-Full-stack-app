import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

export default function DashboardLayout() {
  return (
    <div>
      <div>
        <Logo />
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat necessitatibus facilis aspernatur nisi architecto labore, quasi laudantium recusandae commodi natus mollitia minima assumenda, placeat maiores. Nostrum obcaecati eveniet nesciunt quos!</p>
      </div>
      {/* <main className="min-h-screen">
        <Outlet />
      </main> */}
    </div>
  );
}
