import { z } from "zod";
import { getSantinToken } from "~/lib/auth/functions/getSantinUser";
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
    const token = await getSantinToken();
    const response = await santinProcedure.getUserSession({
      token: token?.id.toString() || "",
    });

    return response.data;
  }),
});
