import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabaseClient";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FiFileText,
  FiBox,
  FiX,
  FiShoppingBag,
  FiPlus,
  FiCheck,
  FiTrendingUp,
  FiTrendingDown,
  FiAward,
  FiStar,
  FiUser,
  FiGift,
  FiChevronRight,
} from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { Link } from "react-router-dom";
import { getDiscountLabel, TIER_CONFIG } from "../lib/constants";

export default function Dashboard() {
  const { profile, role } = useAuth();

  if (role === "Admin") {
    return <AdminDashboard />;
  }

  if (role === "Member") {
    return <MemberDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 flex items-center justify-center">
      <LoadingSpinner text="Memuat dashboard..." />
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState({ totalOrders: 0, completed: 0, cancelled: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data: orders } = await supabase.from("orders").select("*");
      const allOrders = orders || [];
      const completedOrders = allOrders.filter((o) => o.status === "Completed");
      setStats({
        totalOrders: allOrders.length,
        completed: completedOrders.length,
        cancelled: allOrders.filter((o) => o.status === "Cancelled").length,
        revenue: completedOrders.reduce((s, o) => s + Number(o.total_price), 0),
      });
      setRecentOrders(allOrders.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const pieData = [
    { name: "Completed", value: stats.completed || 1 },
    { name: "Pending", value: stats.totalOrders - stats.completed - stats.cancelled || 1 },
    { name: "Cancelled", value: stats.cancelled || 1 },
  ];
  const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

  const chartData = [
    { day: "Sen", value: 20 },
    { day: "Sel", value: 40 },
    { day: "Rab", value: 35 },
    { day: "Kam", value: 60 },
    { day: "Jum", value: 45 },
    { day: "Sab", value: 70 },
    { day: "Min", value: 55 },
  ];

  const StatCard = ({ icon: Icon, value, label, color, bg, trend, up }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-5 hover:shadow-md transition-all duration-300 group">
      <div className={"relative w-14 h-14 flex items-center justify-center " + bg + " rounded-2xl group-hover:scale-110 transition-transform"}>
        <Icon className={color} size={26} />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        {trend && (
          <div className={"flex items-center gap-1 text-xs font-bold " + (up ? "text-green-600" : "text-red-500")}>
            {up ? <FiTrendingUp /> : <FiTrendingDown />}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

  if (loading) return <LoadingSpinner text="Memuat dashboard..." />;

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <PageHeader title="Dashboard" breadcrumb="Hi, Admin. Welcome back to Sedap Admin!" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={FiFileText} value={stats.totalOrders} label="Total Orders" bg="bg-pink-50" color="text-pink-700" />
        <StatCard icon={FiBox} value={stats.completed} label="Completed" bg="bg-green-50" color="text-green-600" />
        <StatCard icon={FiX} value={stats.cancelled} label="Cancelled" bg="bg-red-50" color="text-red-600" />
        <StatCard icon={FiShoppingBag} value={formatRupiah(stats.revenue)} label="Total Revenue" bg="bg-amber-50" color="text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-7 rounded-2xl shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Orders Overview</h3>
              <p className="text-sm text-gray-400">Weekly order growth</p>
            </div>
            <select className="bg-gray-50 border-none text-sm font-medium rounded-lg px-3 py-2 outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} dy={10} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="value" fill="#BE185D" radius={[8, 8, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
          <div className="w-full text-left mb-4">
            <h3 className="text-lg font-bold text-gray-800">Order Status</h3>
            <p className="text-sm text-gray-400">Distribution by status</p>
          </div>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} cornerRadius={10} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-extrabold text-pink-800">{stats.totalOrders}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</p>
            </div>
          </div>
          <div className="flex gap-4 mt-2">
            {pieData.map((entry, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                <span className="text-xs font-medium text-gray-500">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      {recentOrders.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-50 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="py-3">ID</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-mono text-xs">{String(o.id).substring(0, 8)}...</td>
                    <td className="font-semibold">{formatRupiah(o.total_price)}</td>
                    <td>
                      <span className={"px-2 py-1 rounded-md text-xs font-semibold " + (
                        o.status === "Completed" ? "bg-green-100 text-green-700" :
                        o.status === "Cancelled" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      )}>{o.status}</span>
                    </td>
                    <td className="text-gray-500">{new Date(o.created_at).toLocaleDateString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function MemberDashboard() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [orderRes, prodRes] = await Promise.all([
          supabase.from("orders").select("*").eq("customer_id", profile?.id).order("created_at", { ascending: false }),
          supabase.from("products").select("*").limit(4).order("created_at", { ascending: false }),
        ]);
        setOrders(orderRes.data || []);
        setProducts(prodRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (profile?.id) fetchData();
  }, [profile?.id]);

  const totalPointsEarned = orders.reduce((s, o) => s + (o.points_earned || 0), 0);
  const currentPoints = profile?.points || 0;
  const tier = profile?.tier || "Silver";

  const tc = TIER_CONFIG[tier] || TIER_CONFIG.Silver;
  const progress = tier === "Platinum" ? 100 : Math.min((currentPoints / tc.need) * 100, 100);

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

  const getStatusBadge = (status) => {
    const map = { Pending: "bg-amber-100 text-amber-700", Completed: "bg-green-100 text-green-700", Cancelled: "bg-red-100 text-red-700" };
    return <span className={"px-2 py-1 rounded-md text-xs font-semibold " + (map[status] || "")}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8">
        <LoadingSpinner text="Memuat dashboard member..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8">
      <PageHeader title="Dashboard" breadcrumb={`Hi, ${profile?.full_name || "Member"}! Welcome to Sedap!`} />

      {/* Hero Profile Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 via-pink-700 to-purple-700 p-8 mb-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl shadow-lg border-2 border-white/30">
              {tc.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile?.full_name || "Member"}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur">{profile?.role}</span>
                <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur">{tier} Tier</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black">{currentPoints}</p>
            <p className="text-pink-200 text-sm">Total Points</p>
          </div>
        </div>
      </div>

      {/* Stats + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
              <FiShoppingBag className="text-pink-600" size={20} />
            </div>
            <p className="text-sm font-medium text-gray-500">Pesanan Saya</p>
          </div>
          <p className="text-3xl font-black text-gray-900">{orders.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <FiStar className="text-green-600" size={20} />
            </div>
            <p className="text-sm font-medium text-gray-500">Poin Terkumpul</p>
          </div>
          <p className="text-3xl font-black text-gray-900">{totalPointsEarned}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <FiGift className="text-purple-600" size={20} />
            </div>
            <p className="text-sm font-medium text-gray-500">Diskon Aktif</p>
          </div>
          <p className="text-3xl font-black text-gray-900">
            {getDiscountLabel(tier)}
          </p>
        </div>

        <Link
          to="/member-order"
          className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all group flex items-center justify-between"
        >
          <div>
            <p className="text-white/80 text-sm font-medium">Lapar?</p>
            <p className="text-white text-lg font-bold">Pesan Sekarang</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FiChevronRight className="text-white" size={20} />
          </div>
        </Link>
      </div>

      {/* Tier Progress & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tier Progress Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiAward className="text-pink-600" /> Tier Progress
          </h3>
          <div className="text-center mb-4">
            <span className="text-5xl">{tc.icon}</span>
            <p className="text-lg font-bold text-gray-800 mt-2">{tier}</p>
            {tc.next && (
              <p className="text-xs text-gray-400 mt-1">
                {currentPoints} / {tc.need} poin menuju {tc.next}
              </p>
            )}
            {!tc.next && (
              <p className="text-xs text-purple-600 font-medium mt-1">Tier maksimum tercapai! 🎉</p>
            )}
          </div>
          {tc.next && (
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className={"h-full rounded-full transition-all duration-700 ease-out " + tc.bar}
                style={{ width: progress + "%" }}
              ></div>
            </div>
          )}
          <div className="mt-4 space-y-2">
            {[
              { t: "Silver", p: "0-500 pts", c: "bg-gray-100 text-gray-600" },
              { t: "Gold", p: "501-1500 pts", c: "bg-yellow-50 text-yellow-700" },
              { t: "Platinum", p: "1500+ pts", c: "bg-purple-50 text-purple-700" },
            ].map((item) => (
              <div key={item.t} className={"flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium " + (tier === item.t ? item.c + " ring-2 ring-offset-1 " : "text-gray-400")}>
                <span className="font-bold">{item.t}</span>
                <span>{item.p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FiFileText className="text-pink-600" /> Riwayat Pesanan
            </h3>
            <Link to="/member-order" className="text-xs text-pink-600 font-semibold hover:underline">
              Pesan Baru &rarr;
            </Link>
          </div>
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-gray-500 text-xs uppercase tracking-wider">
                    <th className="py-3 font-semibold">Order</th>
                    <th className="font-semibold">Total</th>
                    <th className="font-semibold">Status</th>
                    <th className="font-semibold">Poin</th>
                    <th className="font-semibold">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((item) => (
                    <tr key={item.id} className="border-b hover:bg-pink-50/30 transition">
                      <td className="py-3.5 font-mono text-xs text-gray-500">{String(item.id).substring(0, 8)}...</td>
                      <td className="font-semibold text-gray-800">{formatRupiah(item.total_price)}</td>
                      <td>{getStatusBadge(item.status)}</td>
                      <td className="text-gray-500">+{item.points_earned || 0}</td>
                      <td className="text-gray-400 text-xs">{new Date(item.created_at).toLocaleDateString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <FiShoppingBag className="mx-auto text-4xl text-gray-200 mb-3" />
              <p className="text-gray-400 text-sm mb-4">Belum ada pesanan</p>
              <Link
                to="/member-order"
                className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-700 transition shadow-md"
              >
                <FiPlus size={16} /> Pesan Sekarang
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Products */}
      {products.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FiStar className="text-amber-500" /> Menu Rekomendasi
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 hover:shadow-md hover:border-pink-100 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FiShoppingBag className="text-pink-600" size={18} />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">{p.name}</h4>
                <p className="text-xs text-gray-400 mb-2 line-clamp-1">{p.description || "Menu spesial"}</p>
                <p className="font-bold text-pink-700">{formatRupiah(p.price)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

