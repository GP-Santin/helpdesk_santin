import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import { TanstackQueryProviderWithTRPC } from "./integrations/tanstack-query/root-provider";
import "./styles.css";

// Create a new router instance
export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context: {
        ...TanstackQuery.getContext(),
        //   user: null,
        //   santinUser: null,
      },
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,

      Wrap: (props: { children: React.ReactNode }) => {
        return (
          <TanstackQueryProviderWithTRPC>{props.children}</TanstackQueryProviderWithTRPC>
        );
      },
    }),
    TanstackQuery.getContext().queryClient,
  );

  return router;
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
