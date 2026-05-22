import { useState } from "react";
import PageHeader from "../components/PageHeader";
import orders from "../data/orders";
import products from "../data/products.json";

export default function Orders() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {/* HEADER */}
      <PageHeader
        title="Orders"
        breadcrumb="Dashboard / Orders"
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-pink-800 px-4 py-2 text-white hover:bg-pink-900 transition" // Diubah ke bg-pink-800
        >
          {showForm ? "Close Form" : "Add Orders"}
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Add Orders
          </h2>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Order ID"
              className="rounded-lg border p-3 focus:outline-none focus:border-pink-400"
            />

            <input
              type="text"
              placeholder="Customer Name"
              className="rounded-lg border p-3 focus:outline-none focus:border-pink-400"
            />

            <select className="rounded-lg border p-3 focus:outline-none focus:border-pink-400">
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <input
              type="number"
              placeholder="Total Price"
              className="rounded-lg border p-3 focus:outline-none focus:border-pink-400"
            />

            <input
              type="date"
              className="rounded-lg border p-3 focus:outline-none focus:border-pink-400"
            />

            <button className="rounded-lg bg-pink-700 px-4 py-2 text-white hover:bg-pink-800 transition"> {/* Diubah ke bg-pink-700 */}
              Save Orders
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl bg-white p-6 shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-3">Order ID</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Order Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item) => (
              <tr
                key={item.orderId}
                className="border-b hover:bg-pink-50/30 transition" // Efek hover diubah ke sedikit nuansa pink
              >
                <td className="py-3 text-gray-600">
                  {item.orderId}
                </td>

                <td className="font-medium text-gray-800">
                  {item.customerName}
                </td>

                <td>
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    item.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </td>

                <td className="font-semibold text-gray-900">
                  Rp {item.totalPrice.toLocaleString('id-ID')}
                </td>

                <td className="text-gray-500">
                  {item.orderDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}