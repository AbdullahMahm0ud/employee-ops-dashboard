import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { AuthLoadingScreen } from "@/components/login-screen";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <AuthLoadingScreen />;
  if (!user) return <RedirectToSignIn />;
  return <AppShell>{children}</AppShell>;
}
