import { getProductsWithCategory } from "@/utils/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
    try {
        const productos = await getProductsWithCategory();
        return new Response(JSON.stringify(productos));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error al obtener productos" }), {
            status: 500,
        });
    }
}
