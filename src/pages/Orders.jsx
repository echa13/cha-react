import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { toast } from "../lib/toast";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: "",
    total_price: "",
    status: "Pending",
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*, profiles(full_name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      toast.error("Gagal memuat pesanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from("orders").insert({
        customer_id: formData.customer_id || null,
        total_price: parseFloat(formData.total_price) || 0,
        status: formData.status || "Pending",
      });

      if (error) throw error;

      toast.success("Pesanan berhasil ditambahkan!");
      setFormData({ customer_id: "", total_price: "", status: "Pending" });
      setShowForm(false);
      fetchOrders();
    } catch (err) {
      toast.error(err.message || "Gagal menambahkan pesanan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus, totalPrice, customerId) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      if (newStatus === "Completed") {
        const pointsEarned = Math.floor(totalPrice / 10000);

        if (pointsEarned > 0 && customerId) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("points")
            .eq("id", customerId)
            .single();

          if (profile) {
            const newPoints = (profile.points || 0) + pointsEarned;
            let newTier = "Silver";
            if (newPoints > 1500) newTier = "Platinum";
            else if (newPoints > 500) newTier = "Gold";

            await supabase
              .from("profiles")
              .update({ points: newPoints, tier: newTier })
              .eq("id", customerId);

            await supabase
              .from("orders")
              .update({ points_earned: pointsEarned })
              .eq("id", orderId);

            toast.success(`Pesanan selesai! +${pointsEarned} poin untuk customer`);
          }
        } else {
          toast.success("Pesanan selesai!");
        }
      } else {
        toast.success(`Status pesanan diubah menjadi ${newStatus}`);
      }

      fetchOrders();
    } catch (err) {
      toast.error(err.message || "Gagal mengubah status");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-amber-100 text-amber-700",
      Completed: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${styles[status] || ""}`}>
        {status}
      </span>
    );
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div>
      <PageHeader title="Orders" breadcrumb="Dashboard / Orders">
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-pink-800 px-4 py-2 text-white hover:bg-pink-900 transition"
        >
          {showForm ? "Close Form" : "Add Orders"}
        </button>
      </PageHeader>

      {showForm && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Add Orders</h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              placeholder="Customer ID (UUID)"
              className="rounded-lg border p-3 focus:outline-none focus:border-pink-400"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="rounded-lg border p-3 focus:outline-none focus:border-pink-400"
            >
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <input
              type="number"
              name="total_price"
              value={formData.total_price}
              onChange={handleChange}
              placeholder="Total Price"
              className="rounded-lg border p-3 focus:outline-none focus:border-pink-400"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-pink-700 px-4 py-2 text-white hover:bg-pink-800 transition disabled:opacity-50"
            >
              {submitting ? "Menyimpan..." : "Save Orders"}
            </button>
          </form>
        </div>
      )}

      {loading && <LoadingSpinner text="Memuat pesanan..." />}

      {!loading && orders.length > 0 && (
        <div className="overflow-x-auto rounded-xl bg-white p-6 shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-3">Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Points</th>
                <th>Date</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.id} className="border-b hover:bg-pink-50/30 transition">
                  <td className="py-3 text-gray-600 font-mono text-xs">
                    {String(item.id).substring(0, 8)}...
                  </td>
                  <td className="font-medium text-gray-800">
                    {item.profiles?.full_name || "Guest"}
                  </td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td className="font-semibold text-gray-900">
                    {formatRupiah(item.total_price)}
                  </td>
                  <td className="text-gray-500 text-sm">
                    {item.points_earned || 0}
                  </td>
                  <td className="text-gray-500 text-sm">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td>
                    {item.status === "Pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(item.id, "Completed", item.total_price, item.customer_id)}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md hover:bg-green-200 transition"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, "Cancelled", item.total_price, item.customer_id)}
                          className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md hover:bg-red-200 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {item.status === "Completed" && (
                      <span className="text-xs text-green-600 font-medium">Selesai</span>
                    )}
                    {item.status === "Cancelled" && (
                      <span className="text-xs text-red-400 font-medium">Dibatalkan</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <EmptyState text="Belum ada pesanan." />
      )}
    </div>
  );
}
