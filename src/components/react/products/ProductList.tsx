import type { Product } from "@/hooks/useProductFilters";
import { ProductCard } from "./ProductCard";

export const ProductList: React.FC<{ products: Product[] }> = ({ products }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {products.map(p => (
      <ProductCard key={p.id} product={p} />
    ))}
  </div>
);

