import { FiSearch, FiBell, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

// Menambahkan props { userImage } agar bisa menerima foto profil dari MainLayout
export default function Header({ userImage }) {
  const { profile, role, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const displayName = profile?.full_name || "User";
  const displayRole = role || "Guest";
  const roleBadgeColor =
    role === "Admin"
      ? "text-pink-bold"
      : role === "Member"
      ? "text-blue-600"
      : "text-gray-400";

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white/70 backdrop-blur-lg px-8 py-4 border-b border-garis">
      <div className="relative w-96">
        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-soft" size={18} />
        <input
          type="text"
          placeholder="Cari apa hari ini, Kak?..."
          className="w-full bg-latar border border-garis rounded-full py-2.5 pl-12 pr-4 outline-none focus:ring-4 focus:ring-pink-soft/20 focus:border-pink-soft transition-all text-sm"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-garis pr-6">
          <div className="relative group cursor-pointer w-10 h-10 flex items-center justify-center bg-biru/20 text-biru rounded-full hover:scale-110 transition-transform">
            <FiBell size={20} />
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-pink-bold border-2 border-white"></span>
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-pink-soft/20 text-pink-bold rounded-full cursor-pointer hover:rotate-45 transition-all">
            <FiSettings size={20} />
          </div>
        </div>

        <div className="flex items-center gap-3 font-barlow">
          <div className="text-right">
            <p className="text-sm font-bold text-teks leading-none">{displayName}</p>
            <p className={`text-[10px] font-bold mt-1 uppercase tracking-tighter ${roleBadgeColor}`}>
              {displayRole}
            </p>
          </div>
          <div className="p-1 rounded-full bg-gradient-to-tr from-pink-soft to-pink-bold">
            {/* Menggunakan userImage dari assets, jika gagal/kosong otomatis pakai avatar default */}
            <img
              src={userImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
              className="w-9 h-9 rounded-full border-2 border-white object-cover"
              alt="profile"
            />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm font-medium"
          title="Logout"
        >
          <FiLogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}