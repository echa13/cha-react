import Card from "./Card";

export default function ProductCard({ image, title, category, price, description }) {
  return (
    <Card>
      <div className="relative -mt-8 -mx-8 mb-5 overflow-hidden h-56 rounded-t-[2rem]">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-pink-bold text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-wider shadow-sm">
            {category}
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-black text-teks font-poppins mb-1.5">{title}</h2>
        <p className="text-teks/60 text-xs leading-relaxed font-barlow mb-5 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-garis/50">
          <h3 className="text-2xl font-black text-pink-bold font-barlow">{price}</h3>
          <button className="bg-pink-bold text-white px-4 py-2 rounded-xl text-xs font-bold hover:brightness-105 transition-all shadow-md shadow-pink-bold/20">
            Detail
          </button>
        </div>
      </div>
    </Card>
  );
}