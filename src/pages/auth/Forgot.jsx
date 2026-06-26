import { useState } from "react";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { supabase } from "../../lib/supabaseClient";

export default function Forgot() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
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
      Link reset password telah dikirim ke email kamu.
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-gray-50 border border-gray-200 mb-5 p-5 text-sm rounded-2xl flex items-center gap-3 animate-slide-down">
      <ImSpinner2 className="animate-spin text-lg shrink-0" />
      Mengirim link reset...
    </div>
  ) : null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
        Forgot Your Password?
      </h2>

      <p className="text-sm text-gray-500 mb-6 text-center">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      {errorInfo}
      {successInfo}
      {loadingInfo}

      {!success && (
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4
              rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Send Reset Link"}
          </button>
        </form>
      )}
    </div>
  );
}
