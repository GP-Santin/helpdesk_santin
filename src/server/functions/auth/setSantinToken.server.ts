import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { z } from "zod";

const inputSchema = z.object({
  token: z.string(),
});

export const setSantinTokenCookie = createServerFn({ method: "POST" })
  .validator(inputSchema)
  .handler(async ({ data }) => {
    setCookie("santin_token", data.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true,
      maxAge: 60 * 60 * 24, // 24h
    });
  });
