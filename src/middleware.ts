import { clerkMiddleware, createRouteMatcher, clerkClient} from "@clerk/astro/server";
import { createIfNotExists } from "@/utils/create";

const isProtectedRoute = createRouteMatcher(["/checkout(.*)?"]);

export const onRequest = clerkMiddleware((auth, context) => {
    const { userId, redirectToSignIn } = auth();

    if (isProtectedRoute(context.request) && !userId) {
        return redirectToSignIn();
    }

    if (userId) {
        createIfNotExists(userId, context.locals.currentUser);
    }
});