import { createTRPCContext } from "@trpc/tanstack-react-query";
import { TRPCRouter } from "./router";

export const { TRPCProvider, useTRPC } = createTRPCContext<TRPCRouter>();
