import { useParams, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
// Pastikan path data JSON makanan kamu sudah benar
import productsData from "../data/products.json"; 

export default function ProductsDetail() {
  // Ambil ID produk dari URL router (misal: /products/1)
  const { id } = useParams();

  // Cari data makanan yang cocok berdasarkan ID tersebut
  const product = productsData.find((item) => item.id === parseInt(id));

  // Helper fungsi format rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Jika produk tidak ditemukan di data JSON
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-8 font-barlow flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">Oops! Menu tidak ditemukan 😭</h2>
        <p className="text-gray-400 mt-1 mb-4">Silakan periksa kembali ID produk atau daftar menu Anda.</p>
        <Link 
          to="/products" 
          className="rounded-xl bg-pink-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-pink-800 transition shadow-sm"
        >
          Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 font-barlow">
      {/* HEADER */}
      <PageHeader 
        title="Product Detail" 
        breadcrumb={`Products / Detail / ${product.title}`} 
      />

      {/* DETAIL CARD CONTAINER */}
      <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-sm border border-pink-100 flex flex-col md:flex-row gap-8 mt-6 animate-fade-in">
        
        {/* PANEL FOTO MAKANAN */}
        <div className="w-full md:w-2/5 flex-shrink-0">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-64 md:h-full min-h-[250px] max-h-[350px] object-cover rounded-2xl border border-pink-50 shadow-inner" 
            />
          ) : (
            // Fallback Box jika link gambar kosong/error
            <div className="w-full h-64 md:h-full min-h-[250px] bg-pink-50 flex flex-col items-center justify-center rounded-2xl text-pink-400 font-bold gap-2">
              <span className="text-3xl">🍰</span>
              <span className="text-xs">No Image Available</span>
            </div>
          )}
        </div>

        {/* PANEL TEKS INFORMASI */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Header Menu: Kode & Nama Menu */}
            <div className="border-b border-pink-50 pb-4 mb-5">
              <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-xl text-xs font-mono font-bold tracking-wide shadow-sm">
                {product.code}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-800 mt-2 font-poppins italic text-pink-700">
                {product.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Kitchen/Vendor: <span className="font-semibold text-gray-600">{product.brand}</span>
              </p>
            </div>

            {/* Grid Informasi Detail */}
            <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm mb-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</p>
                <p className="text-base font-semibold text-gray-700 mt-1">{product.category}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Stock Status</p>
                <p className="mt-1">
                  <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${
                    product.stock < 15 
                      ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                      : 'bg-pink-50 text-pink-600 border border-pink-100'
                  }`}>
                    {product.stock} pcs {product.stock < 15 ? '(Restock Soon!)' : '(Ready)'}
                  </span>
                </p>
              </div>

              {/* Box Harga Khusus (Menonjol) */}
              <div className="col-span-2 bg-pink-50/30 rounded-2xl p-4 border border-pink-50/50 shadow-sm">
                <p className="text-xs font-bold text-pink-500 uppercase tracking-wider">Price per Portion</p>
                <p className="text-3xl font-black text-gray-950 mt-0.5">
                  {formatRupiah(product.price)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button Kembali ke List */}
          <div className="pt-4 border-t border-pink-50 flex justify-end">
            <Link 
              to="/products" 
              className="rounded-xl border border-pink-200 px-5 py-2.5 text-xs font-bold text-pink-600 hover:bg-pink-50/60 transition-all duration-200 active:scale-95"
            >
              ← Kembali ke Menu List
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}