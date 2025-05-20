import { useMemo, useState } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export type Filters = {
  name: string;
  categories: string[];
  sortBy: 'priceAsc' | 'priceDesc';
};


export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<Filters>({
    name: '',
    categories: [],
    sortBy: 'priceAsc',
  });

  const allCategories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter(p =>
      p.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.categories.length === 0 || filters.categories.includes(p.category))
    );

    result = result.sort((a, b) =>
      filters.sortBy === 'priceAsc' ? a.price - b.price : b.price - a.price
    );

    return result;
  }, [products, filters]);

  return {
    filters,
    setFilters,
    allCategories,
    filteredProducts,
  };
}
