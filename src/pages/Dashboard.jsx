import PageHeader from "../components/PageHeader";
import {
  FiFileText,
  FiBox,
  FiX,
  FiShoppingBag,
  FiPlus,
  FiCheck,
  FiTrendingUp,
  FiTrendingDown
} from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function Dashboard() {
  const pieData = [
    { name: "Orders", value: 81 },
    { name: "Growth", value: 22 },
    { name: "Revenue", value: 62 },
  ];

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B"]; // Warna lebih modern (Emerald, Blue, Amber)

  const chartData = [
    { day: "Sun", value: 20 },
    { day: "Mon", value: 40 },
    { day: "Tue", value: 35 },
    { day: "Wed", value: 60 },
    { day: "Thu", value: 45 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 55 },
  ];

  // Komponen Reusable untuk Stat Card
  const StatCard = ({ icon: Icon, badge: BadgeIcon, value, label, trend, isUp, colorClass, bgColor }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-5 hover:shadow-md transition-all duration-300 group">
      <div className={`relative w-14 h-14 flex items-center justify-center ${bgColor} rounded-2xl group-hover:scale-110 transition-transform`}>
        <Icon className={colorClass} size={26} />
        <div className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center ${isUp ? 'bg-emerald-500' : 'bg-rose-500'} border-4 border-white rounded-full`}>
          <BadgeIcon className="text-white" size={10} />
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isUp ? <FiTrendingUp /> : <FiTrendingDown />}
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <PageHeader
        title="Dashboard"
        breadcrumb="Hi, Samantha. Welcome back to Sedap Admin!"
      />

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={FiFileText} badge={FiPlus} value="75" label="Total Orders" 
          trend="4% (30 days)" isUp={true} colorClass="text-emerald-600" bgColor="bg-emerald-50"
        />
        <StatCard 
          icon={FiBox} badge={FiCheck} value="357" label="Total Delivered" 
          trend="4% (30 days)" isUp={true} colorClass="text-blue-600" bgColor="bg-blue-50"
        />
        <StatCard 
          icon={FiX} badge={FiX} value="65" label="Total Canceled" 
          trend="25% (30 days)" isUp={false} colorClass="text-rose-600" bgColor="bg-rose-50"
        />
        <StatCard 
          icon={FiShoppingBag} badge={FiCheck} value="$128" label="Total Revenue" 
          trend="12% (30 days)" isUp={false} colorClass="text-amber-600" bgColor="bg-amber-50"
        />
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LINE CHART (Lebih Lebar) */}
        <div className="lg:col-span-2 bg-white p-7 rounded-2xl shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Orders Overview</h3>
              <p className="text-sm text-gray-400">Monthly order growth</p>
            </div>
            <select className="bg-gray-50 border-none text-sm font-medium rounded-lg px-3 py-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 12}}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={4}
                  dot={{ r: 6, fill: '#10B981', strokeWidth: 3, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
          <div className="w-full text-left mb-4">
            <h3 className="text-lg font-bold text-gray-800">Order Analytics</h3>
            <p className="text-sm text-gray-400">Distribution by category</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend Custom */}
          <div className="flex gap-4 mt-2">
            {pieData.map((entry, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                <span className="text-xs font-medium text-gray-500">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}