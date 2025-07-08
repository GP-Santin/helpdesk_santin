import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { santinProcedure } from "~/integrations/trpc/routers/santin/santin.procedure";

export const getSantinUser = createServerFn({ method: "GET" }).handler(async () => {
  const { headers } = getWebRequest();
  const token = headers.get("santin_token");
  if (!token) {
    return null;
  }
  const session = await santinProcedure.getUserSession({
    token: token || "",
  });

  return session?.data || null;
});
