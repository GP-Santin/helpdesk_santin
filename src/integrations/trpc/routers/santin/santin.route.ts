import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../init";
import { santinProcedure } from "./santin.procedure";

export const santinRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        senha: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const response = await santinProcedure.login(input);

      return response;
    }),

  getUserSession: publicProcedure.query(async () => {
    const response = await santinProcedure.getUserSession({
      token: "123",
    });

    return response.data;
  }),
});
