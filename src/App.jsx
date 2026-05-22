import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./assets/tailwind.css";
import Loading from "./components/Loading";

// Layout & Pages
// import Orders from "./pages/Orders";
// import MainLayout from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";
// import Login from "./pages/auth/login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";
// import Dashboard from "./pages/Dashboard";
const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders= React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const NotFound = React.lazy(() => import("./pages/NotFound"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register= React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))

const Products = React.lazy(() => import("./pages/Products"))
const ProductsDetail = React.lazy(() => import("./pages/ProductsDetail"))

function App() {
  // Tambahkan RETURN di sini
  return (
    <Suspense fallback={<Loading/>}>
    <Routes>
      {/* Route yang MENGGUNAKAN Sidebar & Header */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customer" element={<Customers />} />
        
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductsDetail />} /> 
      

      {/* Route yang TIDAK menggunakan Sidebar (Halaman Full Screen) */}
      {/* <Route path="/error400" element={<ErrorPage code="400" />} />
      <Route path="/error401" element={<ErrorPage code="401" />} />
      <Route path="/error403" element={<ErrorPage code="403" />} /> */}
</Route>
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
