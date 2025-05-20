import type { Filters } from "@/hooks/useProductFilters";

type Props = {
    filters: Filters;
    allCategories: string[];
    onChange: (newFilters: Partial<Filters>) => void;
};

export const FiltersSidebar: React.FC<Props> = ({ filters, allCategories, onChange }) => (
    <aside className="p-4 flex w-full items-center justify-between sticky gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Buscar por nombre</label>
        <input
          type="text"
          value={filters.name}
          onChange={e => onChange({ name: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          placeholder="Nombre del producto"
        />
      </div>

      <details>
        <summary>Categorias</summary>
        
        {allCategories.map(c => (
          <label key={c}>
            <input
              type="checkbox"
              checked={filters.categories.includes(c)}
              onChange={e => onChange({ categories: e.target.checked ? [...filters.categories, c] : filters.categories.filter(c => c !== c) })}
            />
            {c}
          </label>
        ))}
      </details>

      <div>
        <label className="block text-sm font-medium mb-1">Ordenar por precio</label>
        <select
          value={filters.sortBy}
          onChange={e => onChange({ sortBy: e.target.value as any })}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="priceAsc">Ascendente</option>
          <option value="priceDesc">Descendente</option>
        </select>
      </div>
    </aside>
);
  
  