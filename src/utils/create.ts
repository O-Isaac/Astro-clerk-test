import type { User } from "@clerk/astro/server";
import { db, eq, Pedidos, Usuarios } from "astro:db";

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
    total: number,
}

export const createOrderIfNotExists = async (id: string, status: string, order: Order, onCreated: (id: string) => void) => {
    const pedido = await db.select()
        .from(Pedidos)
        .where(eq(Pedidos.id, id))
        .get();
    
    if (pedido) {
        return false;
    }
    
    try {
        const { userId, direccion, checkoutId, products, total } = order

        await db.insert(Pedidos).values({
            id,
            userId,
            direccion,
            estado: status == "paid" ? "Pagado" : status,
            sessionId: checkoutId,
            productos: JSON.stringify(products),
            total,
        })
        
        onCreated(id);
        
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}