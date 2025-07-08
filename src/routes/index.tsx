import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useEffect } from "react";
import ThemeToggle from "~/components/ThemeToggle";
import { Button } from "~/components/ui/button";
import authClient from "~/lib/auth/auth-client";
import logo from "~/logo.svg";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user, santinUser: context.santinUser };
  },
});

function Home() {
  const { user, santinUser } = Route.useLoaderData();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (santinUser) {
        router.navigate({ to: "/dashboard" });
      } else {
        router.navigate({ to: "/santin/login" });
      }
    }
  }, [user, router, santinUser]);

  return (
    <main className="bg-background flex h-full w-full flex-col items-center justify-center p-4">
      <div className="space-y-6 text-center">
        <img
          src={logo}
          alt="Grupo Santin"
          width={120}
          height={120}
          className="mx-auto object-contain"
          loading="eager"
        />
        <h1 className="text-2xl font-semibold">Grupo Santin</h1>
        <Button
          variant="outline"
          className="dark:hover:text-background flex items-center gap-2 border border-gray-300 hover:bg-gray-50"
          onClick={() =>
            authClient.signIn.social({
              provider: "microsoft",
              callbackURL: "/santin/login",
            })
          }
        >
          <Mail className="h-4 w-4" />
          <span className="hover:">Fazer login com e-mail</span>
        </Button>

        <ThemeToggle />
      </div>
    </main>
  );
}
