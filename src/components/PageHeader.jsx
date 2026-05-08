import { FiCalendar, FiChevronDown } from "react-icons/fi";

export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
        <nav className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{breadcrumb}</span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {children}
        <div className="flex cursor-pointer items-center gap-4 rounded-2xl bg-white border border-gray-100 p-2 pr-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-inner">
            <FiCalendar size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Filter Periode</p>
            <p className="text-sm font-bold text-gray-700">17 Apr - 21 May 2024</p>
          </div>
          <FiChevronDown className="ml-2 text-gray-300" />
        </div>
      </div>
    </div>
  );
}