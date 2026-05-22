import { useState } from "react";
import { Link } from "react-router-dom"; // <-- Ditambahkan untuk navigasi ke detail
import PageHeader from "../components/PageHeader";
import initialProducts from "../data/products"; 

export default function Product() {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);

  // State untuk menampung data form produk baru (Default kategori diganti ke Bakery & Cakes)
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    category: "Bakery & Cakes", 
    brand: "Lovely Kitchen",
    price: "",
    stock: "",
  });

  // Handle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle submit form (Tambah Produk)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: products.length + 1,
      title: formData.title,
      code: formData.code,
      category: formData.category,
      brand: formData.brand,
      price: parseInt(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
    };

    setProducts([...products, newProduct]);
    
    // Reset Form & Sembunyikan Form
    setFormData({ title: "", code: "", category: "Bakery & Cakes", brand: "Lovely Kitchen", price: "", stock: "" });
    setShowForm(false);
  };

  // Format ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div>
      {/* HEADER */}
      <PageHeader
        title="Products"
        breadcrumb="Dashboard / Products"
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-pink-800 px-4 py-2 text-white hover:bg-pink-900 transition"
        >
          {showForm ? "Close Form" : "Add Product"}
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-xl bg-white p-6 shadow-sm border border-pink-100">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Add New Product</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleChange}
              className="rounded-lg border p-3 w-full focus:outline-none focus:border-pink-400"
              required
            />

            <input
              type="text"
              name="code"
              placeholder="Product Code (e.g., BCK-BR-001)"
              value={formData.code}
              onChange={handleChange}
              className="rounded-lg border p-3 w-full focus:outline-none focus:border-pink-400"
              required
            />

            {/* Opsi Kategori Diubah Menjadi Tema Makanan */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="rounded-lg border p-3 w-full focus:outline-none focus:border-pink-400"
            >
              <option value="Bakery & Cakes">Bakery & Cakes</option>
              <option value="Pastry">Pastry</option>
              <option value="Main Course">Main Course</option>
              <option value="Beverages">Beverages</option>
              <option value="Dessert">Dessert</option>
              <option value="Snacks">Snacks</option>
            </select>

            <input
              type="text"
              name="brand"
              placeholder="Vendor / Brand"
              value={formData.brand}
              onChange={handleChange}
              className="rounded-lg border p-3 w-full focus:outline-none focus:border-pink-400"
              required
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

            {/* Warna tombol simpan disesuaikan menjadi pink-700 */}
            <button 
              type="submit" 
              className="rounded-lg bg-pink-700 px-4 py-2 text-white md:col-span-2 hover:bg-pink-800 transition shadow-sm"
            >
              Save Product
            </button>
          </div>
        </form>
      )}

      {/* TABLE */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-pink-50 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-pink-50 text-gray-600">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Vendor</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-pink-50/40">
            {products.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-pink-50/20 transition-colors duration-150"
              >
                <td className="py-3 px-4 font-bold text-pink-400">#{item.id}</td>
                
                {/* NAMA PRODUK SEBAGAI LINK */}
                <td className="py-3 px-4">
                  <Link 
                    to={`/products/${item.id}`} 
                    className="font-semibold text-gray-800 hover:text-pink-600 hover:underline transition-colors duration-150"
                  >
                    {item.title}
                  </Link>
                </td>

                <td className="py-3 px-4">
                  <span className="bg-pink-100/70 text-pink-700 px-2.5 py-1 rounded-md text-xs font-mono font-semibold">
                    {item.code}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500">{item.category}</td>
                <td className="py-3 px-4 text-gray-600 font-medium">{item.brand}</td>
                <td className="py-3 px-4 font-bold text-gray-900">{formatRupiah(item.price)}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    item.stock < 15 
                      ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                      : 'bg-pink-50 text-pink-600 border border-pink-100'
                  }`}>
                    {item.stock} pcs
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}