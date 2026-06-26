import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProductsDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError) throw fetchError;
        setProduct(data);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-8">
        <LoadingSpinner text="Memuat detail produk..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-8 font-barlow flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">Oops! Menu tidak ditemukan</h2>
        <p className="text-gray-400 mt-1 mb-4">{error || "Silakan periksa kembali ID produk."}</p>
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
      <PageHeader
        title="Product Detail"
        breadcrumb={`Products / Detail / ${product.name}`}
      />

      <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-sm border border-pink-100 flex flex-col md:flex-row gap-8 mt-6">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="border-b border-pink-50 pb-4 mb-5">
              <h2 className="text-2xl md:text-3xl font-black text-gray-800 font-poppins italic text-pink-700">
                {product.name}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm mb-6">
              <div className="col-span-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</p>
                <p className="text-base text-gray-700 mt-1">
                  {product.description || "Tidak ada deskripsi"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Stock Status</p>
                <p className="mt-1">
                  <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${
                    product.stock < 15
                      ? "bg-rose-50 text-rose-600 border border-rose-100"
                      : "bg-pink-50 text-pink-600 border border-pink-100"
                  }`}>
                    {product.stock} pcs {product.stock < 15 ? "(Restock Soon!)" : "(Ready)"}
                  </span>
                </p>
              </div>

              <div className="col-span-2 bg-pink-50/30 rounded-2xl p-4 border border-pink-50/50">
                <p className="text-xs font-bold text-pink-500 uppercase tracking-wider">Price</p>
                <p className="text-3xl font-black text-gray-950 mt-0.5">
                  {formatRupiah(product.price)}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-pink-50 flex justify-end">
            <Link
              to="/products"
              className="rounded-xl border border-pink-200 px-5 py-2.5 text-xs font-bold text-pink-600 hover:bg-pink-50/60 transition-all duration-200"
            >
              Kembali ke Menu List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
