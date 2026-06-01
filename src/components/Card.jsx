export default function Card({ children }) {
  return (
    <div className="bg-white border border-garis rounded-[2rem] shadow-sm p-8 overflow-hidden">
      {children}
    </div>
  );
}