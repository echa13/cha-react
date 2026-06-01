import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import Footer from "../components/Footer";

export default function Components() {
  const headers = ["No", "Menu Item", "Category", "Price", "Status"];
  const menuItems = [
    { id: 1, name: "Red Velvet Cake", category: "Bakery & Cakes", price: "Rp 35.000", status: "success", statusText: "Best Seller" },
    { id: 2, name: "Butter Croissant", category: "Pastry", price: "Rp 18.000", status: "primary", statusText: "Freshly Baked" },
    { id: 3, name: "Thai Tea Latte", category: "Beverages", price: "Rp 22.000", status: "warning", statusText: "Limited" }
  ];

  return (
    <Container className="bg-pink-soft/5 min-h-screen font-barlow">
      {/* HEADER SECTION */}
      <div className="border-b border-garis pb-5 mb-8">
        <h1 className="text-4xl font-black tracking-tight text-teks font-poppins italic">
          Sedap<span className="text-pink-bold">❤</span> Components
        </h1>
        <p className="text-[10px] font-bold text-pink-soft uppercase tracking-[0.2em] mt-1">
          Lovely Kitchen Admin UI Library
        </p>
      </div>

      {/* 1. BASIC COMPONENTS SECTION */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5 text-teks flex items-center gap-2">
          <span className="w-2 h-6 bg-pink-bold rounded-full"></span> 1. Basic Component
        </h2>
        <div className="bg-white rounded-[2rem] border border-garis p-8 shadow-sm space-y-8">
          {/* Buttons */}
          <div>
            <h3 className="text-[11px] font-bold text-pink-soft uppercase tracking-[0.15em] mb-3">
              Action Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button type="primary">Primary Button</Button>
              <Button type="secondary">Secondary Button</Button>
              <Button type="success">Success Action</Button>
              <Button type="warning">Warning Notice</Button>
              <Button type="danger">Danger Delete</Button>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-[11px] font-bold text-pink-soft uppercase tracking-[0.15em] mb-3">
              Status Badges
            </h3>
            <div className="flex flex-wrap gap-3">
              <Badge type="primary">Available</Badge>
              <Badge type="success">Best Seller</Badge>
              <Badge type="warning">Low Stock</Badge>
              <Badge type="danger">Sold Out</Badge>
              <Badge type="secondary">Beverages</Badge>
            </div>
          </div>

          {/* Avatars */}
          <div>
            <h3 className="text-[11px] font-bold text-pink-soft uppercase tracking-[0.15em] mb-3">
              Admin & Staff Avatars
            </h3>
            <div className="flex gap-6">
              <div className="text-center group">
                <Avatar name="Echa" />
                <p className="text-xs mt-2 font-bold text-teks group-hover:text-pink-bold transition-colors">Owner</p>
              </div>
              <div className="text-center group">
                <Avatar name="Budi" />
                <p className="text-xs mt-2 font-bold text-teks/70">Chef</p>
              </div>
              <div className="text-center group">
                <Avatar name="Siti" />
                <p className="text-xs mt-2 font-bold text-teks/70">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DATA DISPLAY - PRODUCT CARDS */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5 text-teks flex items-center gap-2">
          <span className="w-2 h-6 bg-pink-bold rounded-full"></span> 2. Menu Showcase (Product Cards)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductCard
            image="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600"
            title="Strawberry Cheesecake"
            category="Dessert"
            price="Rp 45.000"
            description="Cheesecake lembut dengan topping selai strawberry segar dan potongan buah asli."
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600"
            title="Assorted Pastry Box"
            category="Bakery"
            price="Rp 120.000"
            description="Satu kotak berisi 6 macam pastry premium, cocok untuk hantaran atau dinikmati bersama."
          />
        </div>
      </section>

      {/* 3. DATA DISPLAY - TABLE */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5 text-teks flex items-center gap-2">
          <span className="w-2 h-6 bg-pink-bold rounded-full"></span> 3. Inventory Overview (Table)
        </h2>
        <div className="bg-white rounded-[2rem] border border-garis p-4 shadow-sm overflow-hidden">
          <Table headers={headers}>
            {menuItems.map((item, index) => (
              <tr 
                key={item.id} 
                className="hover:bg-pink-soft/10 transition-colors duration-200 border-b border-pink-soft/10 last:border-none"
              >
                <td className="px-6 py-4 font-bold text-pink-bold">#{index + 1}</td>
                <td className="px-6 py-4 font-semibold text-teks">{item.name}</td>
                <td className="px-6 py-4">
                  <Badge type="primary">{item.category}</Badge>
                </td>
                <td className="px-6 py-4 font-bold text-teks">{item.price}</td>
                <td className="px-6 py-4">
                  <Badge type={item.status}>{item.statusText}</Badge>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </section>

      {/* 4. FOOTER (Sekarang Sudah Menyesuaikan Tema) */}
      <section className="mt-16">
        <Footer />
      </section>
    </Container>
  );
}