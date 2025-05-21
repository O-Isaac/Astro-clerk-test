import { getAllProducts } from "@/services/suprabox";
import { withServer } from "../lib/defineTool";


export default withServer("suprabox-obtener-productos", {}, async () => {
    // Deberia devolver el array entero o por cada producto content type text?
    const productos = await getAllProducts() as any[];
    
    return {
        content: productos.map((producto: any) => ({ type: "text", text: JSON.stringify(producto) })),
    }
})