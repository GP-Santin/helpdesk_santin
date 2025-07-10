import { serverOnly } from "@tanstack/react-start";
import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";

import { env } from "@/env/server";
import { Pool } from "pg";

const getAuthConfig = serverOnly(() =>
  betterAuth({
    baseURL: env.VITE_BASE_URL,
    // https://www.better-auth.com/docs/integrations/tanstack#usage-tips
    plugins: [reactStartCookies()],
    database: new Pool({
      connectionString: env.DATABASE_URL,
    }),

    // https://www.better-auth.com/docs/concepts/session-management#session-caching
    // session: {
    //   cookieCache: {
    //     enabled: true,
    //     maxAge: 5 * 60, // 5 minutes
    //   },
    // },

    // https://www.better-auth.com/docs/concepts/oauth
    socialProviders: {
      microsoft: {
        clientId: process.env.MICROSOFT_CLIENT_ID!,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
        tenantId: process.env.MICROSOFT_TENANT_ID!,
      },
    },
  }),
);

export const auth = getAuthConfig();
