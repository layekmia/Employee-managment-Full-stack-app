import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-white">
      <NavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
