import { useProductFilters, type Product } from "@/hooks/useProductFilters"
import { FiltersSidebar } from "@/components/react/products/FilterSidebar"
import { ProductList } from "@/components/react/products/ProductList"

type Props = { products: Product[] };

export const ProductsPage: React.FC<Props> = ({ products }) => {
  const { filters, setFilters, allCategories, filteredProducts } = useProductFilters(products);

  return (
    <div className=" container mx-auto min-h-dvh">
      <FiltersSidebar
        filters={filters}
        allCategories={allCategories}
        onChange={changes => setFilters(prev => ({ ...prev, ...changes }))}
      />

      <main className="flex-1 overflow-auto">
        <ProductList products={filteredProducts} />
      </main>
    </div>
  );
};

  