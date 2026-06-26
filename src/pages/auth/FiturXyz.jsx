import { useState } from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "../../components/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  FiHeart,
  FiStar,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiMail,
  FiLock,
  FiUserPlus,
  FiLogIn,
  FiCheckCircle,
  FiAlertCircle,
  FiAward,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";

const features = [
  {
    icon: FiShoppingBag,
    title: "Order Management",
    description: "Kelola pesanan dengan mudah. Pantau status, riwayat, dan analitik pesanan secara real-time.",
    color: "bg-pink-50 text-pink-600",
    badge: "Baru",
  },
  {
    icon: FiUsers,
    title: "Customer Profiles",
    description: "Data pelanggan lengkap dengan sistem tier dan poin loyalty untuk program member.",
    color: "bg-blue-50 text-blue-600",
    badge: "Premium",
  },
  {
    icon: FiPackage,
    title: "Product Catalog",
    description: "Manajemen produk dengan CRUD lengkap. Atur stok, harga, dan kategori menu.",
    color: "bg-amber-50 text-amber-600",
    badge: "Populer",
  },
  {
    icon: FiAward,
    title: "Points & Rewards",
    description: "Sistem poin otomatis dan tier member: Silver, Gold, Platinum dengan benefit eksklusif.",
    color: "bg-purple-50 text-purple-600",
    badge: "Unggulan",
  },
  {
    icon: FiTrendingUp,
    title: "Dashboard Analytics",
    description: "Visualisasi data dengan grafik interaktif. Pantau pertumbuhan bisnis dalam satu tampilan.",
    color: "bg-green-50 text-green-600",
    badge: "Pro",
  },
  {
    icon: FiDollarSign,
    title: "Revenue Tracking",
    description: "Lacak pendapatan, biaya, dan profit margin dengan laporan keuangan yang detail.",
    color: "bg-rose-50 text-rose-600",
    badge: "Pro",
  },
];

const stats = [
  { label: "Total Features", value: "12+", icon: FiStar, color: "text-pink-600" },
  { label: "Active Users", value: "150+", icon: FiUsers, color: "text-blue-600" },
  { label: "Orders Processed", value: "2.5K", icon: FiShoppingBag, color: "text-amber-600" },
  { label: "Uptime", value: "99.9%", icon: FiCheckCircle, color: "text-green-600" },
];

export default function FiturXyz() {
  const [showLoginDemo, setShowLoginDemo] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <PageHeader title="Fitur XYZ" breadcrumb="Dashboard / Fitur XYZ">
        <Button
          onClick={() => setShowLoginDemo(!showLoginDemo)}
          className="rounded-lg bg-pink-800 px-4 py-2 text-white hover:bg-pink-900 transition text-sm"
        >
          {showLoginDemo ? "Show Features" : "Demo Login"}
        </Button>
      </PageHeader>

      {!showLoginDemo ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4 hover:shadow-md transition-all duration-300 group"
              >
                <div className={"w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 group-hover:scale-110 transition-transform " + stat.color}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FiStar className="text-pink-600" />
              Semua Fitur
            </h3>
            <p className="text-sm text-gray-400 mt-1">Fitur-fitur unggulan Sedap Admin Dashboard</p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 hover:shadow-md hover:border-pink-100 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={"w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform " + feature.color}>
                    <feature.icon size={24} />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">
                    {feature.badge}
                  </Badge>
                </div>
                <h4 className="text-base font-bold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-pink-600 to-pink-800 rounded-2xl p-8 shadow-lg text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Siap Mengelola Bisnismu?</h3>
                <p className="text-pink-100 text-sm">
                  Semua fitur siap digunakan. Mulai kelola pesanan, produk, dan pelanggan dengan mudah.
                </p>
              </div>
              <Button className="bg-white text-pink-800 hover:bg-pink-50 font-bold px-8 py-6 rounded-xl shadow-lg whitespace-nowrap">
                Mulai Sekarang
              </Button>
            </div>
          </div>
        </>
      ) : (
        /* Demo Login Card */
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-lg">
              <FiLock className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Demo Login</h3>
            <p className="text-sm text-gray-400 mt-1">Masuk untuk mengakses semua fitur</p>
          </div>

          <Card className="border-pink-100 shadow-md">
            <CardHeader className="border-b border-pink-50 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-gray-800">Welcome Back</CardTitle>
                  <CardDescription className="text-sm text-gray-400">
                    Masuk ke akun Sedap Admin kamu
                  </CardDescription>
                </div>
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                  <FiHeart className="text-pink-500" size={18} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form>
                <div className="flex flex-col gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="demo-email" className="text-sm font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <FiMail className="text-gray-400" size={14} />
                        Email Address
                      </div>
                    </Label>
                    <Input
                      id="demo-email"
                      type="email"
                      placeholder="admin@sedap.com"
                      className="rounded-xl border-gray-200 bg-gray-50 px-4 py-3 h-11 focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="demo-password" className="text-sm font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <FiLock className="text-gray-400" size={14} />
                          Password
                        </div>
                      </Label>
                      <a href="#" className="text-xs text-pink-600 font-medium hover:underline">
                        Forgot?
                      </a>
                    </div>
                    <Input
                      id="demo-password"
                      type="password"
                      placeholder="********"
                      className="rounded-xl border-gray-200 bg-gray-50 px-4 py-3 h-11 focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                    />
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
                    <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-amber-700">
                      Demo credentials: <strong>admin@sedap.com</strong> / <strong>admin123</strong>
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-3 pt-2 pb-6 px-6 bg-gray-50/50 rounded-b-2xl border-t border-gray-100">
              <Button className="w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-6 rounded-xl shadow-sm transition-all">
                <FiLogIn className="mr-2" size={16} />
                Login to Dashboard
              </Button>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <FiUserPlus size={14} />
                <span>
                  Belum punya akun? <a href="/register" className="text-pink-600 font-semibold hover:underline">Register</a>
                </span>
              </div>
            </CardFooter>
          </Card>

          <div className="text-center mt-6">
            <button
              onClick={() => setShowLoginDemo(false)}
              className="text-sm text-gray-400 hover:text-pink-600 transition-colors font-medium"
            >
              Kembali ke Fitur
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
