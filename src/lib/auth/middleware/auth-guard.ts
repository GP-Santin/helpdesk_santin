import { auth } from "@/lib/auth";
import { getSantinUser } from "@/server/functions/auth/getSantinToken.server";
import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest, setResponseStatus } from "@tanstack/react-start/server";

// https://tanstack.com/start/latest/docs/framework/react/middleware
// This is a sample middleware that you can use in your server functions.

/**
 * Middleware to force authentication on a server function, and add the user to the context.
 */
export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { headers } = getWebRequest();

    const session = await auth.api.getSession({
      headers,
      query: {
        // ensure session is fresh
        // https://www.better-auth.com/docs/concepts/session-management#session-caching
        disableCookieCache: true,
      },
    });

    if (!session) {
      setResponseStatus(401);
      throw new Error("Unauthorized");
    }

    const santinUser = await getSantinUser();

    return next({
      context: { user: session.user, santinUser: santinUser },
    });
  },
);
