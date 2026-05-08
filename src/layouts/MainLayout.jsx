import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]"> {/* Warna background lebih soft */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-10 max-w-[1600px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}