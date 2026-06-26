import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";
import { useState } from "react";

export default function AlertBox({ type = "info", children, dismissible = true }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const styles = {
    success: {
      bg: "bg-green-50 border-green-200 text-green-800",
      icon: <FiCheckCircle className="text-green-500 text-xl shrink-0" />,
    },
    error: {
      bg: "bg-red-50 border-red-200 text-red-800",
      icon: <FiAlertCircle className="text-red-500 text-xl shrink-0" />,
    },
    info: {
      bg: "bg-blue-50 border-blue-200 text-blue-800",
      icon: <FiInfo className="text-blue-500 text-xl shrink-0" />,
    },
  };

  const current = styles[type] || styles.info;

  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-lg mb-5
        animate-slide-down ${current.bg}`}
    >
      {current.icon}
      <p className="flex-1 text-sm font-medium">{children}</p>
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className="opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Tutup"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
}
