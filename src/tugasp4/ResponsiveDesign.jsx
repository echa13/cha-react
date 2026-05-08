import GuestView from "./GuestView";
import AdminView from "./AdminView";
import { useState } from "react";

export default function ResponsiveDesign() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 p-4 sm:p-8 font-sans selection:bg-pink-500/30 selection:text-pink-100">
      <div className="max-w-7xl mx-auto bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-pink-900/10 border border-zinc-800 overflow-hidden">
        
        {/* HEADER - PINK & SILVER GLOW STYLE */}
        <header className="relative bg-zinc-900 px-8 py-16 sm:px-16 sm:py-24 overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-pink-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-rose-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 text-pink-400 text-xs font-bold uppercase tracking-widest mb-6 border border-pink-500/30">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_rgba(244,114,182,0.8)]"></span>
              Portal Karir Masa Depan
            </span>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1]">
              TEMUKAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">KARIR</span> IMPIANMU
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 mt-6 max-w-2xl font-medium leading-relaxed">
              Platform rekrutmen generasi baru. Eksplorasi ribuan peluang kerja dari perusahaan teknologi terbaik di Indonesia.
            </p>
          </div>
        </header>

        {/* NAVIGATION - SILVER & PINK PILLS */}
        <nav className="flex flex-wrap items-center gap-2 p-4 sm:px-10 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-30">
          {[
            { id: "home", label: "Overview", icon: "❖" },
            { id: "guest", label: "Cari Lowongan", icon: "🔍" },
            { id: "admin", label: "HR Dashboard", icon: "⚡" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                page === item.id
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-[0_0_15px_rgba(244,114,182,0.4)]"
                  : "bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              <span className={page === item.id ? "text-pink-100" : "text-zinc-500"}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* CONTENT AREA */}
        <main className="p-6 sm:p-10 lg:p-12 min-h-[60vh] bg-zinc-950/50">
          {page === "home" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
              <JobStats />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <ResponsiveText />
                  <ResponsiveGrid />
                </div>
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <ResponsiveWidth />
                  <ResponsiveLayout />
                </div>
              </div>
            </div>
          )}
          {page === "guest" && <GuestView />}
          {page === "admin" && <AdminView />}
        </main>

        <footer className="px-10 py-8 border-t border-zinc-800 text-center flex flex-col items-center justify-center bg-zinc-900">
          <p className="text-zinc-500 text-sm font-semibold">© 2026 • Designed with Cha ✨</p>
        </footer>
      </div>
    </div>
  );
}

// 🔹 BENTO GRID COMPONENTS (Tema Silver/Pink)
function JobStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {[
        { label: "Posisi Aktif", val: "1.2k+", trend: "+12%", color: "text-pink-400" },
        { label: "Perusahaan", val: "450", trend: "+5%", color: "text-rose-400" },
        { label: "Pelamar", val: "12k", trend: "+24%", color: "text-fuchsia-400" },
        { label: "Rata-rata Gaji", val: "15jt", trend: "+8%", color: "text-pink-300" },
      ].map((stat, i) => (
        <div key={i} className="p-6 bg-zinc-800/50 rounded-3xl border border-zinc-700 hover:border-pink-500/30 hover:shadow-[0_0_15px_rgba(244,114,182,0.1)] transition-all group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
            <span className="text-[10px] font-bold text-pink-400 bg-pink-400/10 px-2 py-1 rounded-full">{stat.trend}</span>
          </div>
          <p className={`text-3xl sm:text-4xl font-black ${stat.color} group-hover:scale-105 transition-transform origin-left`}>{stat.val}</p>
        </div>
      ))}
    </div>
  );
}

function ResponsiveText() {
  return (
    <section className="bg-zinc-800/50 p-8 rounded-3xl border border-zinc-700 hover:border-zinc-600 transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-10 w-2 bg-gradient-to-b from-pink-400 to-rose-400 rounded-full shadow-[0_0_10px_rgba(244,114,182,0.5)]"></div>
        <h2 className="text-2xl font-black text-white tracking-tight">Matchmaking Cerdas</h2>
      </div>
      <p className="text-lg text-zinc-400 font-medium leading-relaxed">
        Algoritma kami mencocokkan profil dan skill Anda dengan perusahaan yang memiliki budaya kerja serta ekspektasi gaji yang paling sesuai, secara real-time.
      </p>
    </section>
  );
}

function ResponsiveGrid() {
  return (
    <section className="bg-zinc-800/50 p-8 rounded-3xl border border-zinc-700">
      <h2 className="text-xl font-bold text-white mb-6">Kategori Terpopuler</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { name: 'Software Eng', icon: '💻' }, { name: 'Product Design', icon: '🎨' },
          { name: 'Marketing', icon: '📈' }, { name: 'Data Science', icon: '📊' },
          { name: 'Finance', icon: '💰' }, { name: 'HR & Legal', icon: '⚖️' }
        ].map((item, index) => (
          <div key={index} className="group cursor-pointer p-5 bg-zinc-900/50 border border-zinc-700 rounded-2xl hover:bg-zinc-800 hover:border-pink-500/50 transition-all text-center sm:text-left">
            <div className="text-2xl mb-3 group-hover:scale-110 transition-transform origin-center sm:origin-left">{item.icon}</div>
            <h3 className="font-bold text-zinc-300 text-sm group-hover:text-pink-300">{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResponsiveWidth() {
  return (
    <section className="bg-zinc-900 p-8 rounded-3xl text-white shadow-lg border border-zinc-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10"></div>
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">📍 Persebaran Lokasi</h2>
      <div className="space-y-4 relative z-10">
        <div>
          <div className="flex justify-between text-sm font-bold mb-2 text-zinc-300">
            <span>Jakarta Selatan</span>
            <span className="text-pink-400">80%</span>
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 h-full w-[80%] rounded-full shadow-[0_0_10px_rgba(244,114,182,0.6)]"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm font-bold mb-2 mt-4 text-zinc-300">
            <span>Bandung</span>
            <span className="text-rose-400">45%</span>
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="bg-rose-400 h-full w-[45%] rounded-full shadow-[0_0_10px_rgba(251,113,133,0.6)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResponsiveLayout() {
  return (
    <section className="bg-zinc-800/50 p-8 rounded-3xl border border-zinc-700">
      <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">✨ Update Platform</h2>
      <div className="space-y-5">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-pink-950 text-pink-400 border border-pink-800 flex items-center justify-center font-bold shrink-0">1</div>
          <p className="text-sm text-zinc-400 font-medium">Fitur <strong className="text-zinc-200">1-Click Apply</strong> kini tersedia untuk pengguna premium.</p>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center font-bold shrink-0">2</div>
          <p className="text-sm text-zinc-400 font-medium">Integrasi kalender untuk jadwal interview otomatis dengan HR.</p>
        </div>
      </div>
    </section>
  );
}