import { db, Categorias, Productos, eq } from "astro:db";

export const getCategorias = async () => {
  return await db.select().from(Categorias).all();
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
  return await db.select().from(Productos).all();
} 