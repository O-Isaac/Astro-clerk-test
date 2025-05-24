import type { Product } from "@/hooks/useProductFilters";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <a href={`/product/${product.id}`}>
    <div className="relative rounded-xl overflow-hidden shadow-lg flex items-center gap-6 bg-transparent cursor-pointer group">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover filter blur-3xl opacity-20 scale-110 transition-transform group-hover:scale-105"
        aria-hidden="true"
      />

      <img
        src={product.imageUrl}
        alt={product.name}
        className="relative w-32 h-32 object-contain rounded"
      />

      <div className="relative text-white flex flex-col justify-center space-y-1 min-w-[180px]">
        <h4 className="font-semibold text-lg truncate">{product.name}</h4>
        <p>{product.category}</p>
        <p><span className="font-semibold">{product.price.toFixed(2)}€</span></p>
      </div>
    </div>
  </a>
);
