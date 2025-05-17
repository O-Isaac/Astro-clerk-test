import { db, Categorias, Productos, eq, inArray, Usuarios } from "astro:db";

export const getCategorias = async () => {
  return await db
    .select()
    .from(Categorias)
    .all();
};

export const getProductByCategory = async (categoryId: string) => {
  return await db.select()
    .from(Productos)
    .where(eq(Productos.categoria, categoryId))
    .all();
}

export const getProductById = async (productId: string) => {
  return await db.select()
    .from(Productos)
    .where(eq(Productos.id, Number(productId)))
    .all();
}

export const getProducts = async () => {
  return await db
    .select()
    .from(Productos)
    .all();
}

export const getMultipleProductsByIds = (productIds: number[]) => {
  return db
    .select()
    .from(Productos)
    .where(inArray(Productos.id, productIds))
    .all();
}

export const getUsername = (userId: string) => {
  return db.select()
    .from(Usuarios)
    .where(eq(Usuarios.id, userId))
    .get();
}

export const getAllUsers = () => {
  return db.select()
    .from(Usuarios)
    .all();
}


export const getProductosConCantidad = async (items: [number, number][]) => {
  const ids = items.map(([id]) => id);

  const productos = await db
    .select()
    .from(Productos)
    .where(inArray(Productos.id, ids))
    .all();

  const resultado = productos.map((producto) => {
    const match = items.find(([id]) => id === producto.id);
    return {
      ...producto,
      cantidad: match?.[1] ?? 0,
    };
  });

  return resultado;
};
