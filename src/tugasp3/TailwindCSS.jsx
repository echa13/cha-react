import UserForm from "./UserForm";

export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
      
      {/* Container Utama dengan Max Width agar tidak terlalu lebar */}
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 overflow-hidden border border-slate-100">
        
        <div className="flex flex-col md:flex-row">
          
          {/* Sisi Kiri: Dekoratif / Info Singkat */}
          <div className="bg-blue-600 md:w-1/3 p-8 text-white flex flex-col justify-center">
            <div className="mb-4 bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold leading-tight">Portal Beasiswa 2026</h2>
            <p className="mt-4 text-blue-100 text-sm leading-relaxed">
              Pastikan seluruh data akademik yang anda masukkan telah sesuai dengan transkrip nilai terbaru.
            </p>
            <div className="mt-8 pt-8 border-t border-blue-500/50 text-[10px] text-blue-200 uppercase tracking-widest">
              Verified System v2.0
            </div>
          </div>

          {/* Sisi Kanan: Form (UserForm.jsx) */}
          <div className="flex-1 p-8 md:p-12">
            <header className="mb-8">
              <h1 className="text-2xl font-black text-slate-800">Pendaftaran Mahasiswa</h1>
              <div className="h-1.5 w-12 bg-blue-600 mt-2 rounded-full"></div>
            </header>

            {/* Komponen Form Utama */}
            <UserForm />

            <footer className="mt-10 text-center">
              <p className="text-xs text-slate-400 font-medium italic">
                * Tombol submit akan muncul otomatis setelah semua validasi hijau.
              </p>
            </footer>
          </div>

        </div>
      </div>

    </div>
  );
}