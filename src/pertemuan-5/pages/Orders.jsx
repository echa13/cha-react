import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import PageHeader from "../components/PageHeader";

import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const orders = [
  {
    id: "#ORD-1001",
    customer: "Salsabila",
    product: "Macbook Air M2",
    status: "Delivered",
    total: "Rp 18.000.000",
  },
  {
    id: "#ORD-1002",
    customer: "Andi",
    product: "iPhone 15 Pro",
    status: "Pending",
    total: "Rp 22.000.000",
  },
  {
    id: "#ORD-1003",
    customer: "Rina",
    product: "Keyboard Logitech",
    status: "Canceled",
    total: "Rp 1.200.000",
  },
];

function StatusBadge({ status }) {
  if (status === "Delivered") {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">
        <FaCheckCircle />
        {status}
      </div>
    );
  }

  if (status === "Pending") {
    return (
      <div className="flex items-center gap-2 text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full text-sm">
        <FaClock />
        {status}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm">
      <FaTimesCircle />
      {status}
    </div>
  );
}

export default function Orders() {
  return (
    <div className="flex bg-[#F3F4F6] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="px-6 py-5">
          <PageHeader />

          <div className="bg-white rounded-2xl shadow-sm p-6 mt-4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Orders List
                </h2>

                <p className="text-sm text-gray-400">
                  Daftar pesanan terbaru customer
                </p>
              </div>

              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">
                + Add Order
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 border-b">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="py-4 font-semibold text-gray-700">
                        {order.id}
                      </td>

                      <td className="py-4">{order.customer}</td>

                      <td className="py-4">{order.product}</td>

                      <td className="py-4">
                        <StatusBadge status={order.status} />
                      </td>

                      <td className="py-4 font-semibold text-gray-700">
                        {order.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}