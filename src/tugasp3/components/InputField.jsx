export default function InputField({ label, type, value, onChange, error }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
        ${error 
          ? "border-red-500 bg-red-50 focus:ring-4 focus:ring-red-100" 
          : "border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50"}
        `}
      />
      {/* Alert Error di bawah input */}
      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
          <span className="text-xs font-semibold">⚠ {error}</span>
        </div>
      )}
    </div>
  );
}