/// <reference types="vite/client" />
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TRPCRouter } from "@/integrations/trpc/router";
import { getUser } from "@/lib/auth/functions/getUser";
import { getSantinUser } from "@/server/functions/auth/getSantinUser.server";
import appCss from "@/styles.css?url";
import { TRPCOptionsProxy } from "@trpc/tanstack-react-query";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: Awaited<ReturnType<typeof getUser>>;
  santinUser: Awaited<ReturnType<typeof getSantinUser>>;
  trpc: TRPCOptionsProxy<TRPCRouter>;
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: ({ signal }) => getUser({ signal }),
    }); // we're using react-query for caching, see router.tsx
    const santinUser = await context.queryClient.fetchQuery({
      queryKey: ["santinUser"],
      queryFn: ({ signal }) => getSantinUser({ signal }),
    });
    return { user, santinUser, trpc: context.trpc };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "React TanStarter",
      },
      {
        name: "description",
        content: "A minimal starter template for 🏝️ TanStack Start.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ThemeProvider>
  );
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
  return (
    // suppress since we're updating the "dark" class in a custom script below
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="h-screen w-screen">
        <Toaster richColors toastOptions={{}} theme="system" />
        {children}

        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="top-right" />

        <Scripts />
      </body>
    </html>
  );
}
