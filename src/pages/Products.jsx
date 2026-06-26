import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { toast } from "../lib/toast";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import AlertBox from "../components/AlertBox";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setProducts(data || []);
    } catch (err) {
      setError(err.message);
      toast.error("Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error: insertError } = await supabase.from("products").insert({
        name: formData.name,
        description: formData.description || null,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
      });

      if (insertError) throw insertError;

      toast.success("Produk berhasil ditambahkan!");
      setFormData({ name: "", description: "", price: "", stock: "" });
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.message || "Gagal menambahkan produk");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const { error: deleteError } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      toast.success("Produk berhasil dihapus");
      fetchProducts();
    } catch (err) {
      toast.error(err.message || "Gagal menghapus produk");
    }
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
      <PageHeader title="Products" breadcrumb="Dashboard / Products">
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-pink-800 px-4 py-2 text-white hover:bg-pink-900 transition"
        >
          {showForm ? "Close Form" : "Add Product"}
        </button>
      </PageHeader>

      {error && <AlertBox type="error">{error}</AlertBox>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-xl bg-white p-6 shadow-sm border border-pink-100">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Add New Product</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-lg border p-3 w-full focus:outline-none focus:border-pink-400"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              className="rounded-lg border p-3 w-full focus:outline-none focus:border-pink-400"
            />
            <input
              type="number"
              name="price"
              placeholder="Price (IDR)"
              value={formData.price}
              onChange={handleChange}
              className="rounded-lg border p-3 w-full focus:outline-none focus:border-pink-400"
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="rounded-lg border p-3 w-full focus:outline-none focus:border-pink-400"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-pink-700 px-4 py-2 text-white md:col-span-2 hover:bg-pink-800 transition shadow-sm disabled:opacity-50"
            >
              {submitting ? "Menyimpan..." : "Save Product"}
            </button>
          </div>
        </form>
      )}

      {loading && <LoadingSpinner text="Memuat produk..." />}

      {!loading && products.length > 0 && (
        <div className="rounded-xl bg-white p-6 shadow-sm border border-pink-50 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-pink-50 text-gray-600">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50/40">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-pink-50/20 transition-colors duration-150">
                  <td className="py-3 px-4 font-bold text-pink-400">
                    {String(item.id).substring(0, 8)}...
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/products/${item.id}`}
                      className="font-semibold text-gray-800 hover:text-pink-600 hover:underline transition-colors duration-150"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-gray-500 max-w-xs truncate">
                    {item.description || "-"}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">
                    {formatRupiah(item.price)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      item.stock < 15
                        ? 'bg-rose-50 text-rose-600 border border-rose-100'
                        : 'bg-pink-50 text-pink-600 border border-pink-100'
                    }`}>
                      {item.stock} pcs
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-rose-400 hover:text-rose-600 transition-colors text-sm font-medium"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && products.length === 0 && !error && (
        <EmptyState text="Belum ada produk. Tambah produk pertama!" />
      )}
    </div>
  );
}
