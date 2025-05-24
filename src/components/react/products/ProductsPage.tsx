import { useProductFilters, type Product } from "@/hooks/useProductFilters"
import { FiltersSidebar } from "@/components/react/products/FilterSidebar"
import { ProductList } from "@/components/react/products/ProductList"

type Props = { products: Product[] };

export const ProductsPage: React.FC<Props> = ({ products }) => {
  const { filters, setFilters, allCategories, filteredProducts } = useProductFilters(products);

  return (
    <div className="container grid grid-cols-[200px_1fr] mx-auto min-h-dvh">
      
      <FiltersSidebar
        filters={filters}
        allCategories={allCategories}
        onChange={changes => setFilters(prev => ({ ...prev, ...changes }))}
      />

      <main className="overflow-auto min-h-dvh">
        <ProductList products={filteredProducts} />
      </main>
    </div>
  );
};

  