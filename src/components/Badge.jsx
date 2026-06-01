export default function Badge({ children, type = "primary" }) {
  const types = {
    primary: "bg-pink-soft/10 text-pink-bold border border-pink-soft/20",
    secondary: "bg-purple-50 text-purple-600 border border-purple-100",
    success: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    danger: "bg-rose-50 text-rose-600 border border-rose-100",
    warning: "bg-amber-50 text-amber-600 border border-amber-100",
  };

  return (
    <span className={`${types[type]} px-3.5 py-1 rounded-xl text-xs font-bold tracking-wide inline-block`}>
      {children}
    </span>
  );
}