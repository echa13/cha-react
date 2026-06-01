import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import fotoProfil from "../assets/Profil.png"; 

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Mengirimkan file fotoProfil ke komponen Header */}
        <Header userImage={fotoProfil} />
        <main className="p-10 max-w-[1600px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}