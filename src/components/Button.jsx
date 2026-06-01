export default function Button({ children, type = "primary" }) {
  const types = {
    primary: "bg-pink-bold text-white shadow-md shadow-pink-bold/20 hover:brightness-105",
    secondary: "bg-pink-soft/10 text-pink-bold border border-pink-soft/20 hover:bg-pink-soft/20",
    success: "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 hover:bg-emerald-600",
    danger: "bg-rose-500 text-white shadow-md shadow-rose-500/25 hover:bg-rose-600",
    warning: "bg-amber-400 text-white shadow-md shadow-amber-400/25 hover:bg-amber-500",
  };

  return (
    <button className={`${types[type]} px-5 py-2.5 rounded-2xl transition-all duration-300 font-bold text-xs tracking-wide`}>
      {children}
    </button>
  );
}