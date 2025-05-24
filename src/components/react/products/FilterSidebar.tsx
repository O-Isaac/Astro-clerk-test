import type { Filters } from "@/hooks/useProductFilters";

type Props = {
  filters: Filters;
  allCategories: string[];
  onChange: (newFilters: Partial<Filters>) => void;
};

interface CategoryFilterProps {
  name: string;
  onChange: (newFilters: Partial<Filters>) => void;
  filters: Filters;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ name, onChange, filters }) => {
  return (
    <div className="flex items-center justify-start">
        <label className="flex items-center cursor-pointer relative" htmlFor={name}>
        <input type="checkbox"
          onChange={e => onChange({ categories: e.target.checked ? [...filters.categories, name] : filters.categories.filter(cat => cat !== name) })}
          className="peer h-5 w-5  cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
          id={name} />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
            stroke="currentColor" strokeWidth="1">
            <path fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"></path>
          </svg>
        </span>
      </label>
      <label className="cursor-pointer ml-2  text-sm" htmlFor={name}>
        {name}
      </label>
    </div>
  )
}

export const FiltersSidebar: React.FC<Props> = ({ filters, allCategories, onChange }) => (
  <aside className="p-4 flex flex-col w-full items-center top-20 sticky gap-4">
    <div className="w-full">
      <label className="block text-sm font-medium mb-4 w-full border-b py-2">Buscar por nombre</label>
      <input
        type="text"
        value={filters.name}
        onChange={e => onChange({ name: e.target.value })}
        className="w-full px-3 py-2 border rounded"
        placeholder="Nombre del producto"
      />
    </div>

    <details open={true} className="w-full">
      <summary className="border-b py-2">Categorias</summary>

      <div className="inline-flex gap-2 my-4 flex-col">
       {allCategories.map(category => (
        <CategoryFilter key={category} name={category} onChange={onChange} filters={filters} />
       ))}
      </div>


    </details>

    <div className="w-full">
      <label className="block text-sm font-medium border-b w-full mb-2 py-2 ">Ordenar por precio</label>
      <select
        value={filters.sortBy}
        onChange={e => onChange({ sortBy: e.target.value as any })}
        className="w-full px-3 py-2 mt-2 border rounded *:text-black"
      >
        <option value="priceAsc">Ascendente</option>
        <option value="priceDesc">Descendente</option>
      </select>
    </div>
  </aside>
);

