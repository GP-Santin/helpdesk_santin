import { santinProcedure } from "@/integrations/trpc/routers/santin/santin.procedure";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const getSantinUser = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie("santin_token");
  if (!token) return null;

  const session = await santinProcedure.getUserSession({ token });
  return session?.data || null;
});
