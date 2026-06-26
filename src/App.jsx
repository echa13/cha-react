import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";
import { Toaster } from "sonner";
import Loading from "./components/Loading";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Components from "./pages/Components";
import Note from "./pages/Note";

// Layout & Pages (Bawaan asli project kamu)
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Error401 = React.lazy(() => import("./pages/Error401"));
const Error403 = React.lazy(() => import("./pages/Error403"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const FiturXyz = React.lazy(() => import("./pages/auth/FiturXyz"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductsDetail = React.lazy(() => import("./pages/ProductsDetail"));
const MemberOrder = React.lazy(() => import("./pages/MemberOrder"));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Route yang MENGGUNAKAN Sidebar & Header */}
          <Route element={<MainLayout />}>
            {/* Admin-only routes */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Customers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <ProductsDetail />
                </ProtectedRoute>
              }
            />
            {/* Member + Admin routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["Member", "Admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Member-only routes */}
            <Route
              path="/member-order"
              element={
                <ProtectedRoute allowedRoles={["Member"]}>
                  <MemberOrder />
                </ProtectedRoute>
              }
            />
            {/* Public routes (any authenticated user) */}
            <Route path="/fitur-xyz" element={<FiturXyz />} />
            <Route path="/notes" element={<Note />} />
            <Route path="/components" element={<Components />} />
          </Route>
          {/* Route yang TIDAK menggunakan Sidebar (Halaman Full Screen) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
          <Route path="/401" element={<Error401 />} />
          <Route path="/403" element={<Error403 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: "16px",
            padding: "16px",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
