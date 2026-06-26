import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { toast } from "../lib/toast";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

const tierColors = {
  Silver: "bg-gray-100 text-gray-700 border-gray-200",
  Gold: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Platinum: "bg-purple-100 text-purple-700 border-purple-200",
};

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    role: "Member",
    tier: "Silver",
  });

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (err) {
      toast.error("Gagal memuat customer: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from("profiles").insert({
        full_name: formData.full_name,
        role: formData.role,
        tier: formData.tier,
        points: 0,
      });

      if (error) throw error;

      toast.success("Customer berhasil ditambahkan!");
      setFormData({ full_name: "", role: "Member", tier: "Silver" });
      setShowForm(false);
      fetchCustomers();
    } catch (err) {
      toast.error(err.message || "Gagal menambahkan customer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader title="Customers" breadcrumb="Dashboard / Customers">
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-pink-800 px-4 py-2 text-white"
        >
          Add Customer
        </button>
      </PageHeader>

      {showForm && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">Add Customer</h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              className="rounded-lg border p-3"
              required
            />
            <select name="role" value={formData.role} onChange={handleChange} className="rounded-lg border p-3">
              <option>Member</option>
              <option>Admin</option>
              <option>Guest</option>
            </select>
            <select name="tier" value={formData.tier} onChange={handleChange} className="rounded-lg border p-3">
              <option>Silver</option>
              <option>Gold</option>
              <option>Platinum</option>
            </select>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-pink-800 px-4 py-2 text-white disabled:opacity-50"
            >
              {submitting ? "Menyimpan..." : "Save Customer"}
            </button>
          </form>
        </div>
      )}

      {loading && <LoadingSpinner text="Memuat customer..." />}

      {!loading && customers.length > 0 && (
        <div className="rounded-xl bg-white p-6 shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Name</th>
                <th>Role</th>
                <th>Tier</th>
                <th>Points</th>
                <th>Join Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{item.full_name || "-"}</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      item.role === "Admin" ? "bg-pink-100 text-pink-700" :
                      item.role === "Member" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {item.role}
                    </span>
                  </td>
                  <td>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${tierColors[item.tier] || tierColors.Silver}`}>
                      {item.tier}
                    </span>
                  </td>
                  <td className="font-bold text-gray-800">{item.points || 0}</td>
                  <td className="text-gray-500 text-sm">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && customers.length === 0 && (
        <EmptyState text="Belum ada customer." />
      )}
    </div>
  );
}
