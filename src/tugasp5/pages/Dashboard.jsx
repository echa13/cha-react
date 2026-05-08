import { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import PageHeader from "../components/PageHeader";
import { FaGamepad, FaUsers, FaMoneyBillWave, FaHistory, FaSyncAlt, FaSearch } from "react-icons/fa";

// 🏆 Komponen Card Premium
function Card({ icon, value, label, gradient, shadow }) {
  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
      <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} ${shadow} text-white text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
        <p className="text-2xl font-extrabold text-gray-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  // 📊 State Data Statistik
  const [data, setData] = useState({
    topup: 1240,
    users: 850,
    revenue: "15.500.000",
    history: 432,
  });

  // 🔍 State Pencarian & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 🎮 Data Game Lengkap
  const games = [
    { name: "Mobile Legends", img: "/img/ml.png", category: "MOBA", tag: "Populer" },
    { name: "Free Fire", img: "/img/ff.png", category: "Battle Royale", tag: "Promo" },
    { name: "Valorant", img: "/img/valo.png", category: "FPS", tag: "Hot" },
    { name: "PUBG Mobile", img: "/img/pubg.png", category: "Battle Royale", tag: "Populer" },
    { name: "Genshin Impact", img: "/img/genshin.png", category: "RPG", tag: "New" },
  ];

  // ⚙️ Logika Filtering (Search Berfungsi!)
  const filteredGames = games.filter((game) => {
    const matchSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = activeCategory === "All" || game.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const categories = ["All", "MOBA", "Battle Royale", "FPS", "RPG"];

  // 🔄 Fungsi Refresh Animasi
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData({
        topup: Math.floor(Math.random() * 5000) + 1000,
        users: Math.floor(Math.random() * 2000) + 500,
        revenue: `${(Math.floor(Math.random() * 50) + 5)}.000.000`,
        history: Math.floor(Math.random() * 1000) + 100,
      });
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="flex bg-[#F8F9FB] min-h-screen font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto px-6 py-6 pb-20 scrollbar-hide">
          <PageHeader />

          {/* 📊 Baris Statistik */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Overview Bulanan</h2>
              <p className="text-sm text-gray-400">Pantau performa toko game Anda</p>
            </div>
            
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:text-violet-600 hover:border-violet-200 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all font-medium text-sm group"
            >
              <FaSyncAlt className={`${isRefreshing ? "animate-spin text-violet-500" : "group-hover:rotate-180 transition-transform duration-500"}`} />
              Refresh Data
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card icon={<FaGamepad />} value={data.topup} label="Total Transaksi" gradient="from-violet-500 to-fuchsia-500" shadow="shadow-lg shadow-violet-500/30" />
            <Card icon={<FaUsers />} value={data.users} label="Pengguna Aktif" gradient="from-blue-400 to-indigo-500" shadow="shadow-lg shadow-blue-500/30" />
            <Card icon={<FaMoneyBillWave />} value={`Rp ${data.revenue}`} label="Pendapatan" gradient="from-emerald-400 to-teal-500" shadow="shadow-lg shadow-emerald-500/30" />
            <Card icon={<FaHistory />} value={data.history} label="Riwayat Gagal" gradient="from-rose-400 to-red-500" shadow="shadow-lg shadow-rose-500/30" />
          </div>

          {/* 🎮 Bagian Daftar Game dengan Filter & Search BERGUNA */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Katalog Game</h2>
                <p className="text-sm text-gray-400">Kelola game yang tersedia untuk Top Up</p>
              </div>

              {/* Action Bar (Search & Filter) */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari game..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
                  />
                </div>
                
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                        activeCategory === cat 
                        ? "bg-violet-50 text-violet-700 border border-violet-200" 
                        : "bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid Game */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredGames.map((game, i) => (
                  <div
                    key={i}
                    className="group relative bg-gray-50 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-violet-300"
                  >
                    {/* Gambar dengan Overlay Premium */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={game.img}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=Game+Image"; }} // Fallback jika gambar lokal tidak ada
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                      
                      {/* Badge / Tag */}
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-lg text-white shadow-sm
                        ${game.tag === 'Populer' ? 'bg-blue-500' : game.tag === 'Promo' ? 'bg-rose-500' : game.tag === 'Hot' ? 'bg-orange-500' : 'bg-emerald-500'}
                      `}>
                        {game.tag}
                      </span>
                    </div>

                    {/* Info Game di Bawah Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs text-gray-300 font-medium mb-1">{game.category}</p>
                      <p className="text-white font-bold text-base truncate">{game.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Jika pencarian tidak ditemukan
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 mb-2">Game tidak ditemukan</p>
                <button 
                  onClick={() => {setSearchTerm(""); setActiveCategory("All");}} 
                  className="text-violet-600 text-sm font-medium hover:underline"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}