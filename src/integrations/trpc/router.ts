import { createTRPCRouter } from "./init";
import { santinRouter } from "./routers/santin/santin.route";

export const trpcRouter = createTRPCRouter({
  santin: santinRouter,
});
export type TRPCRouter = typeof trpcRouter;
