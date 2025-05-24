import type { User } from "@clerk/astro/server";
import { db, eq, inArray, Lineas, Pedidos, Productos, Usuarios } from "astro:db";

type currentUserFn  = () => Promise<User | null>; 

export async function createIfNotExists(userId: string, currentUser: currentUserFn) {
    const usuario = await db.select()
        .from(Usuarios)
        .where(eq(Usuarios.id, userId))
        .get();


    if (!usuario) {
        const user = await currentUser();

        try {
            if (user) {
                const data = {
                    id: userId,
                    email: user.primaryEmailAddress?.emailAddress || "",
                    nombre: user.fullName || "",
                    profilePicture: user.imageUrl || "",
                }

                await db.insert(Usuarios).values(data)
            
                return data;
            }
        } catch (error) {
            // Manejar el error con sentry a futuro
        }

    }
}

interface Order {
    checkoutId: string,
    userId: string,
    products: Array<[number, number]>,
    direccion: string,
    paymentId: string,
    total: number,
}

export const createOrderIfNotExists = async (id: string, status: string, order: Order) => {
    const pedido = await db.select()
        .from(Pedidos)
        .where(eq(Pedidos.id, id))
        .get();
    
    if (pedido) {
        return false;
    }
    
    try {
        const { userId, direccion, checkoutId, products, total, paymentId } = order

        const datos = {
            id,
            userId,
            direccion,
            estado: status == "paid" ? "Pagado" : status,
            sessionId: checkoutId,
            paymentId,
            total,
        }

        const pedido = await db.insert(Pedidos).values(datos).returning().get()
        
        if (!pedido) {
            console.log("Error al crear el pedido")
            // Manejar el error con sentry a futuro
            return false;
        }

        const productsDatabase = await db.select()
            .from(Productos)
            .where(inArray(Productos.id, products.map(product => product[0])))
            .all()

        const lineas = productsDatabase.map((product, index) => {
            const [_, quantity] = products[index]
            
            return {
                pedidoId: pedido.id,
                productoId: product.id,
                cantidad: quantity,
                precio: product.precio,
            }
        })
        
        await db.insert(Lineas).values(lineas)

        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}