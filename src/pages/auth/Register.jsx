import { useState } from "react";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [dataForm, setDataForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validasi password match
    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      setLoading(false);
      return;
    }

    // Validasi minimal password length
    if (dataForm.password.length < 6) {
      setError("Password minimal 6 karakter");
      setLoading(false);
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: dataForm.email,
        password: dataForm.password,
        options: {
          data: {
            full_name: dataForm.fullName,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // Registrasi sukses
      setSuccess(true);
      setDataForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message || "Terjadi kesalahan yang tidak diketahui");
    } finally {
      setLoading(false);
    }
  };

  const errorInfo = error ? (
    <div className="bg-red-50 border border-red-200 mb-5 p-5 text-sm font-medium text-red-700 rounded-2xl flex items-center gap-3 animate-slide-down">
      <BsFillExclamationDiamondFill className="text-red-500 text-lg shrink-0" />
      {error}
    </div>
  ) : null;

  const successInfo = success ? (
    <div className="bg-green-50 border border-green-200 mb-5 p-5 text-sm font-medium text-green-700 rounded-2xl flex items-center gap-3 animate-slide-down">
      <BsCheckCircleFill className="text-green-500 text-lg shrink-0" />
      Registrasi berhasil! Silakan cek email kamu untuk konfirmasi.
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-gray-50 border border-gray-200 mb-5 p-5 text-sm rounded-2xl flex items-center gap-3 animate-slide-down">
      <ImSpinner2 className="animate-spin text-lg shrink-0" />
      Mohon Tunggu...
    </div>
  ) : null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Create Your Account ✨
      </h2>
      {errorInfo}
      {successInfo}
      {loadingInfo}

      {!success && (
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={dataForm.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
              placeholder="Nama Lengkap"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={dataForm.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={dataForm.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
              placeholder="Minimal 6 karakter"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={dataForm.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4
              rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Mendaftarkan..." : "Register"}
          </button>
        </form>
      )}

      {success && (
        <div className="text-center">
          <p className="text-sm text-gray-500 mt-2">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-900 font-semibold hover:underline">
              Login di sini
            </Link>
          </p>
        </div>
      )}

      {!success && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-900 font-semibold hover:underline">
            Login
          </Link>
        </p>
      )}
    </div>
  );
}
