import type { APIRoute } from "astro";
import { createHash } from "crypto";

const secret = "suprabox-gns-secret"
const salt = "suprabox-gns-salt"

/**
 * Genera un token que va ha ser enviado al MCP para autenticar la sesión del usuario 
 */
export const GET: APIRoute = async ({ locals, redirect }) => {
    try {
        const { userId, redirectToSignIn } = locals.auth();

        if (!userId) {
            const { headers } = redirectToSignIn()
            return new Response(JSON.stringify({ url: headers.get("Location") }))
        }

        // Generar un token bearer de api para usar en otros servicios
        const token = createHash('sha256')
            .update(`${secret}${userId}${salt}`)
            .digest('hex')
            .slice(0, 32)
            .toUpperCase();


        const request = await fetch("http://localhost:8787/api/auth/retrieve-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token })
        })

        if (!request.ok) {
            return new Response(JSON.stringify({ error: "Error al autenticar" }), {
                status: 500,
            })
        }

        // redirect to home
        return redirect("/")
    } catch (error) {
        console.error(error)

        return new Response(JSON.stringify({ error: "Error al autenticar" }), {
            status: 500,
        })
    }
}