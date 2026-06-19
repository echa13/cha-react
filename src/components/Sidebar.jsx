import {
  FiList,
  FiUser,
  FiHeart,
  FiPackage,
  FiShoppingCart,
} from "react-icons/fi";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FiCpu } from "react-icons/fi";
import { FiLayers } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";

const menuClass = ({ isActive }) =>
  `flex items-center rounded-2xl px-5 py-3.5 transition-all duration-300 group
  ${
    isActive
      ? "bg-pink-bold text-white shadow-lg shadow-pink-bold/30 font-semibold scale-105"
      : "text-teks-samping hover:bg-pink-soft/20 hover:text-pink-bold"
  }`;

export default function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-80 flex flex-col bg-white p-8 border-r border-garis">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight text-teks font-poppins italic">
          Sedap<span className="text-pink-bold">❤</span>
        </h1>
        <p className="text-[10px] font-bold text-pink-soft uppercase tracking-[0.2em] mt-1">
          Lovely Kitchen Admin
        </p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-3 font-barlow">
          <li>
            <NavLink to="/" className={menuClass}>
              <MdSpaceDashboard className="mr-4 text-2xl" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={menuClass}>
              <FiShoppingCart className="mr-4 text-2xl" /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/customer" className={menuClass}>
              <FiUser className="mr-4 text-2xl" /> Customers
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={menuClass}>
              <FiPackage className="mr-4 text-2xl" /> Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/components" className={menuClass}>
              <FiLayers className="mr-4 text-2xl" /> Components
            </NavLink>
          </li>
          <li>
            <NavLink to="/fitur-xyz" className={menuClass}>
              <FiCpu className="mr-4 text-2xl" /> Fitur XYZ
            </NavLink>
          </li>
          <li>
            <NavLink to="/notes" className={menuClass}>
              <FiEdit3 className="mr-4 text-2xl" /> Note
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Card bawah yang gemoy */}
      <div className="relative mt-auto overflow-hidden rounded-[2rem] bg-pink-soft/10 border border-pink-soft/30 p-6">
        <div className="relative z-10">
          <p className="text-xs font-bold text-pink-bold mb-2 flex items-center gap-2">
            <FiHeart /> Spread the love
          </p>
          <p className="text-[13px] text-teks/70 leading-relaxed mb-4">
            Wanna add some more sweetness to your menu?
          </p>
          <button className="w-full rounded-xl bg-pink-bold py-2.5 text-xs font-bold text-white hover:brightness-105 transition-all shadow-md">
            + Add New Menu
          </button>
        </div>
        <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-pink-soft/20 blur-xl"></div>
      </div>
    </aside>
  );
}
