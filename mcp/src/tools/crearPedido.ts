import { getAllProducts, getAuthToken } from "@/services/suprabox";
import { withServer } from "@/lib/defineTool";
import { z } from "zod";

const param = {
    category: z.string(),
}

export default withServer("suprabox-crear-pedido", param, async ({ category }, extra) => {
    const { url } = await getAuthToken() as { url: string };

    if (url) {
        return {
            content: [
                { type: "text", text: "Autentificacion requerida, que el usuario inice sesion en el siguiente enlace" },
                { type: "text", text: url },
            ],
        }
    }

    const productos = await getAllProducts() as any[];
    const productosFiltrados = productos.filter((el: any) => el.Categorias.nombre.toLowerCase().includes(category.toLowerCase()));

    // Pedido de ejemplo
    const order = {
        id: "P-2025-2322",
        items: productosFiltrados.map((producto: any) => ({
            id: producto.id,
            name: producto.name,
            price: producto.price,
            quantity: 1,
        })),
        total: productos.reduce((total, producto) => total + producto.price, 0),
        url: "https://suprabox.com/pedido/2025-2322",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    return {
        content: [
            { type: "text", text: "El pedido se ha creado exitosamente" },
            { type: "text", text: JSON.stringify(order) },
        ],
    }
})