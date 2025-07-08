import { ApiError } from "~/helpers/api-error";
import type { PromiseResponse } from "../types";
import type {
  SantinLoginInput,
  SantinLoginResponse,
  SantinUserDTO,
} from "./santin.interface";

export const santinProcedure = {
  login: async (
    input: SantinLoginInput,
  ): Promise<PromiseResponse<SantinLoginResponse>> => {
    const response = await fetch(`${process.env.SANTIN_API_URL}/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = (await response.json()) ?? response.statusText;
      throw new ApiError({
        message: error.message,
        status: response.status,
        url: `${process.env.SANTIN_API_URL}/v1/auth/login`,
        method: "POST",
        requestBody: input,
      });
    }
    const data = await response.json();

    return {
      status: response.status,
      data,
    };
  },

  getUserSession: async ({
    token,
  }: {
    token: string;
  }): Promise<PromiseResponse<SantinUserDTO | null>> => {
    const response = await fetch(`${process.env.SANTIN_API_URL}/v1/auth/user-session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new ApiError({
        message: response.statusText,
        status: response.status,
        url: `${process.env.SANTIN_API_URL}/v1/auth/user-session`,
        method: "GET",
        requestBody: { token },
      });
    }

    const data: SantinUserDTO = await response.json();
    return {
      status: 200,
      data,
    };
  },
};
