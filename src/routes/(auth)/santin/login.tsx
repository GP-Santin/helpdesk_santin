import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/integrations/trpc/react";
import logo from "@/logo.svg";
import { setSantinTokenCookie } from "@/server/functions/auth/setSantinToken.server";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const Route = createFileRoute("/(auth)/santin/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const loginMutation = useMutation(trpc.santin.login.mutationOptions());
  const [viewPassword, setViewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z
          .string({ required_error: "Email é obrigatório" })
          .email({ message: "Email inválido" }),
        senha: z.string({ required_error: "Senha é obrigatória" }),
      }),
    ),
  });

  const handleLogin = (data: { email: string; senha: string }) => {
    setIsLoading(true);
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setSantinTokenCookie({ data: { token: data.data?.token as string } });
        toast.success("Login realizado com sucesso!");
        router.navigate({ to: "/dashboard" });
      },
      onError: (err) => {
        if (err.message.includes("e-mail")) {
          toast.info("Email não confirmado", {
            description: "Siga as instruções enviadas ao seu e-mail para continuar",
            duration: 10000,
          });
        } else {
          toast.error("Erro no login!", {
            description: err.message,
          });
        }
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col items-center justify-center">
      <img src={logo} alt="logo" className="h-50 w-50" />
      <Form {...form}>
        <form
          className="flex w-full flex-col items-center gap-4"
          onSubmit={form.handleSubmit(handleLogin)}
        >
          <div className="flex w-full flex-col gap-2">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite seu email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="senha"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Senha</Label>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          type={viewPassword ? "text" : "password"}
                          className="pr-8"
                          name="current-password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-2 flex cursor-pointer items-center"
                          onClick={handleViewPassword}
                          aria-label={viewPassword ? "Hide password" : "Show password"}
                        >
                          {viewPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button variant="outline" className="w-40" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
