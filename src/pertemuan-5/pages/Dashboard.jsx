import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import PageHeader from "../components/PageHeader";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Komponen Card kecil untuk statistik
function Card({ icon, value, label, bg }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition">
      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${bg} text-white text-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const chartData = [
    { month: "Jan", orders: 30, revenue: 120 },
    { month: "Feb", orders: 45, revenue: 180 },
    { month: "Mar", orders: 38, revenue: 150 },
    { month: "Apr", orders: 60, revenue: 260 },
    { month: "May", orders: 72, revenue: 320 },
    { month: "Jun", orders: 90, revenue: 400 },
  ];

  return (
    <div className="flex bg-[#F3F4F6] min-h-screen">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header di bagian atas */}
        <Header />

        <div className="px-6 py-5">
          {/* Breadcrumb / Judul Halaman */}
          <PageHeader />

          {/* Stat Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-4">
            <Card icon={<FaShoppingCart />} value="75" label="Total Orders" bg="bg-green-500"/>
            <Card icon={<FaTruck />} value="175" label="Delivered" bg="bg-blue-500"/>
            <Card icon={<FaBan />} value="40" label="Canceled" bg="bg-red-500"/>
            <Card icon={<FaDollarSign />} value="Rp 128 Jt" label="Revenue" bg="bg-yellow-500"/>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
            
            {/* Chart Pesanan (Line Chart) */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-800">Orders Overview</h2>
                <p className="text-sm text-gray-400">Tren pesanan 6 bulan terakhir</p>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <Tooltip cursor={{stroke: '#22c55e', strokeWidth: 2}} />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#22c55e"
                      strokeWidth={4}
                      dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart Pendapatan (Bar Chart) */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-800">Revenue Overview</h2>
                <p className="text-sm text-gray-400">Pertumbuhan pendapatan bulanan</p>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f3f4f6'}} />
                    <Bar
                      dataKey="revenue"
                      fill="#3b82f6"
                      radius={[8, 8, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}