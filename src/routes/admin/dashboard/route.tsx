import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/dashboard")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const isAdmin = context.santinUser?.admin;
    if (!isAdmin) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/admin/dashboard"!</div>;
}
