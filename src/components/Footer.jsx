export default function Footer() {
  return (
    <footer className="bg-white text-teks border border-garis py-8 mt-10 rounded-[2rem] shadow-sm overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-pink-bold"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-2xl font-black text-teks italic font-poppins">
          Sedap<span className="text-pink-bold">❤</span>
        </h2>
        <p className="text-[10px] font-bold text-pink-soft uppercase tracking-[0.2em] mt-1 mb-4">Lovely Kitchen Admin</p>
        <div className="flex justify-center gap-6 mb-4 text-xs font-semibold text-teks/70 font-barlow">
          <a href="#" className="hover:text-pink-bold transition-colors">Dashboard</a>
          <a href="#" className="hover:text-pink-bold transition-colors">Products</a>
          <a href="#" className="hover:text-pink-bold transition-colors">Orders</a>
        </div>
        <p className="text-teks/40 text-[11px] font-medium font-barlow">© 2026 Lovely Kitchen. All sweetness reserved.</p>
      </div>
    </footer>
  );
}