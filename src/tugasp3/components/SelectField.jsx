export default function SelectField({ label, value, onChange, options, error }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1 uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none appearance-none bg-white
        ${error 
          ? "border-red-500 bg-red-50" 
          : "border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50"}
        `}
      >
        <option value="">-- Pilih {label} --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && (
        <div className="mt-2 text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 text-xs font-semibold">
          ⚠ {error}
        </div>
      )}
    </div>
  );
}