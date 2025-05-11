import type { User } from "@clerk/astro/server";
import { db, eq, Usuarios } from "astro:db";

type currentUserFn  = () => Promise<User | null>; 

export default async function createOrUpdateUser(userId: string, currentUser: currentUserFn) {
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

    } else {
        return usuario;
    }
}