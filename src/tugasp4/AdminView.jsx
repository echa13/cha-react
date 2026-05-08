import data from "./services.json";
import { useState } from "react";

export default function AdminView() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || item.category === category)
  );

  const getCategoryColor = (cat) => {
    const colors = {
      IT: "bg-pink-900/40 text-pink-400 border-pink-800/50",
      Design: "bg-rose-900/40 text-rose-400 border-rose-800/50",
      Marketing: "bg-fuchsia-900/40 text-fuchsia-400 border-fuchsia-800/50",
      Business: "bg-zinc-800 text-zinc-300 border-zinc-700",
    };
    return colors[cat] || "bg-zinc-800 text-zinc-300 border-zinc-700";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Manajemen <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Lowongan</span>
          </h2>
          <p className="text-zinc-400 font-medium mt-2">
            Kelola data pekerjaan, gaji, dan kategori dalam satu dashboard terpusat.
          </p>
        </div>
        <div className="flex gap-3">
           <div className="px-5 py-3 bg-zinc-800 rounded-2xl text-zinc-300 text-sm font-bold border border-zinc-700 shadow-sm flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]"></span>
             Total Data: <span className="text-white">{filtered.length}</span>
           </div>
        </div>
      </div>

      {/* SEARCH BAR (ADMIN STYLE) */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500">🔍</span>
          <input 
            type="text"
            placeholder="Cari ID, posisi, atau nama..." 
            className="w-full pl-12 pr-4 py-3.5 bg-zinc-800 border border-zinc-700 rounded-2xl text-sm font-medium text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all"
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <select 
          onChange={(e) => setCategory(e.target.value)} 
          className="px-6 py-3.5 bg-zinc-800 border border-zinc-700 rounded-2xl text-sm font-bold text-zinc-300 cursor-pointer focus:ring-2 focus:ring-pink-500 outline-none transition-all md:w-64"
        >
          <option value="">Semua Kategori</option>
          <option value="IT">IT & Engineering</option>
          <option value="Design">Creative Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Business">Business</option>
        </select>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-zinc-800/80 border border-zinc-700 rounded-[2rem] shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-900 border-b border-zinc-700 text-zinc-400 uppercase tracking-widest text-[10px] font-black">
              <tr>
                <th className="px-8 py-5">Role / Posisi</th>
                <th className="px-6 py-5">Kategori</th>
                <th className="px-6 py-5">Budget Gaji</th>
                <th className="px-6 py-5">Lokasi</th>
                <th className="px-8 py-5 text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-700/50 text-zinc-300">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr 
                    key={item.id} 
                    className="hover:bg-zinc-700/30 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt="" className="w-10 h-10 rounded-xl object-cover border border-zinc-600 opacity-80 group-hover:opacity-100" />
                        <div className="flex flex-col">
                          <span className="font-bold text-white group-hover:text-pink-400 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-zinc-500 font-semibold mt-0.5">
                            ID: #{String(item.id).padStart(4, '0')} • {item.provider.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1.5 border rounded-md text-[10px] font-black uppercase tracking-tight ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-bold text-white">
                      Rp {item.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-5 font-medium text-zinc-400">
                      {item.provider?.location || "Remote"}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="inline-flex items-center justify-center px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-zinc-200 rounded-lg text-xs font-bold w-full">
                        ⭐ {item.rating}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-4xl mb-4 grayscale opacity-30">📭</div>
                      <span className="text-base font-bold text-white">Data Kosong</span>
                      <p className="text-sm text-zinc-500 mt-1">Tidak ada data yang cocok dengan pencarian.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}