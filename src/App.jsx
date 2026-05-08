import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Layout & Pages
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";

// Komponen Sederhana (Supaya tidak Error kalau filenya belum ada)
const Customer = () => <div className="p-6"><h1>Halaman Customer</h1></div>;
const NotFound = () => <div className="p-6"><h1>404 - Not Found</h1></div>;

function App() {
  const location = useLocation();

  // Halaman yang tidak pakai Sidebar & Header (Login/Error)
  const hideLayoutRoutes = ["/error400", "/error401", "/error403"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Hanya tampilkan Sidebar & Header jika bukan halaman Error */}
      {!hideLayout && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {!hideLayout && <Header />}

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customer" element={<Customer />} />
            
            {/* Fallback jika route tidak ketemu */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;