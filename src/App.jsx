import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";
import Loading from "./components/Loading";
import Components from "./pages/Components"; // Import komponen baru kamu

// Layout & Pages (Bawaan asli project kamu)
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const FiturXyz = React.lazy(() => import("./pages/auth/FiturXyz"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductsDetail = React.lazy(() => import("./pages/ProductsDetail"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Route yang MENGGUNAKAN Sidebar & Header */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customer" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductsDetail />} />
          <Route path="/fitur-xyz" element={<FiturXyz />} />

          {/* HANYA MENAMBAHKAN BARIS INI */}
          <Route path="/components" element={<Components />} />
        </Route>{" "}
        {/* Tag penutup MainLayout yang tadinya salah posisi sudah diperbaiki di sini */}
        {/* Route yang TIDAK menggunakan Sidebar (Halaman Full Screen) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
