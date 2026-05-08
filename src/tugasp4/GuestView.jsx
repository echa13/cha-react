import data from "./services.json";
import { useState } from "react";

export default function GuestView() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || item.category === category) &&
    (location === "" || item.provider.location === location)
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* FILTER SECTION */}
      <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-[2rem] shadow-xl border border-zinc-700 flex flex-col md:flex-row gap-4 relative z-20">
        <div className="flex-1 relative">
          <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-zinc-500">🔍</span>
          <input 
            placeholder="Cari role impianmu (cth: React Developer)..." 
            className="w-full pl-12 pr-4 py-4 bg-zinc-800 border-none rounded-2xl text-sm font-medium text-white focus:ring-2 focus:ring-pink-500 outline-none placeholder-zinc-500 transition-all"
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
          <select 
            onChange={(e) => setCategory(e.target.value)} 
            className="px-6 py-4 bg-zinc-800 border-none rounded-2xl text-sm font-bold text-zinc-300 cursor-pointer focus:ring-2 focus:ring-pink-500 outline-none whitespace-nowrap"
          >
            <option value="">Semua Bidang</option>
            <option value="IT">Teknologi & IT</option>
            <option value="Design">Creative Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Business">Business</option>
          </select>
          <select 
            onChange={(e) => setLocation(e.target.value)} 
            className="px-6 py-4 bg-zinc-800 border-none rounded-2xl text-sm font-bold text-zinc-300 cursor-pointer focus:ring-2 focus:ring-pink-500 outline-none whitespace-nowrap"
          >
            <option value="">Semua Lokasi</option>
            <option value="Jakarta">Jakarta</option>
            <option value="Bandung">Bandung</option>
            <option value="Surabaya">Surabaya</option>
            <option value="Bali">Bali</option>
          </select>
        </div>
      </div>

      {/* JOBS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div 
            key={item.id} 
            className="group flex flex-col bg-zinc-800/80 rounded-[2rem] border border-zinc-700 hover:border-pink-500/50 shadow-lg hover:shadow-[0_0_20px_rgba(244,114,182,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Image Header */}
            <div className="relative h-56 overflow-hidden bg-zinc-900">
              <img 
                src={item.image} 
                alt={item.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 bg-zinc-900/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider text-pink-400 border border-pink-500/30">
                  {item.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-black line-clamp-1 group-hover:text-pink-400 transition-colors drop-shadow-md">
                  {item.name}
                </h3>
                <p className="text-sm font-medium text-zinc-400 mt-1">
                  {item.provider.name}
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-zinc-300 rounded-lg text-xs font-bold border border-zinc-700">
                  📍 {item.provider.location}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-zinc-300 rounded-lg text-xs font-bold border border-zinc-700">
                  ⏱️ {item.details?.duration || "Full Time"}
                </span>
              </div>

              <div className="mt-auto pt-6 border-t border-zinc-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Gaji Ditawarkan</span>
                  <p className="text-xl font-black text-white">
                    Rp {(item.price / 1000000).toLocaleString('id-ID')} <span className="text-sm text-zinc-500 font-medium">Juta/bln</span>
                  </p>
                </div>
                <button className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl hover:opacity-90 hover:rotate-12 transition-all shadow-[0_0_15px_rgba(244,114,182,0.4)]">
                  ↗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="py-32 flex flex-col items-center justify-center text-center bg-zinc-800/50 rounded-[3rem] border border-dashed border-zinc-700">
          <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center text-4xl mb-6">🏜️</div>
          <h3 className="text-2xl font-black text-white mb-2">Pencarian Tidak Ditemukan</h3>
          <p className="text-zinc-400 font-medium max-w-md">Maaf, kami tidak dapat menemukan posisi yang sesuai. Coba gunakan kata kunci atau filter lain.</p>
        </div>
      )}
    </div>
  );
}