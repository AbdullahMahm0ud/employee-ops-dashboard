import { useQuery } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import { FolderKanban, LayoutGrid, Menu, Settings2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { StaffPulseMark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { loadWorkspace } from "@/lib/staff/api";
import { ROLE_LABELS } from "@/lib/staff/roles";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutGrid },
  { to: "/directory", label: "Directory", icon: FolderKanban },
  { to: "/settings", label: "Settings", icon: Settings2 },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const user = useCurrentUser();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const workspace = useQuery({ queryKey: ["workspace"], queryFn: () => loadWorkspace() });
  const orgName = workspace.data?.profile.orgName ?? "StaffPulse";
  const role = workspace.data?.profile.role;

  return (
    <div className="min-h-svh bg-page text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-page px-4 py-5 md:flex">
        <Brand orgName={orgName} />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <NavLink key={item.to} {...item} active={isActive(pathname, item.to)} />
          ))}
        </nav>
        <div className="rounded-lg border border-line bg-surface p-3">
          {role ? (
            <p className="mb-2 text-xs text-mute">
              Access · {ROLE_LABELS[role]}
            </p>
          ) : null}
          <UserButton />
        </div>
      </aside>

      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-page/90 px-4 py-3 backdrop-blur-sm md:hidden">
          <Brand orgName={orgName} compact />
          <MobileNav pathname={pathname} orgName={orgName} />
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-6 pb-24 md:px-8 md:py-8 md:pb-10">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-3 border-t border-line bg-page/95 backdrop-blur-sm md:hidden">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium",
                active ? "text-primary" : "text-mute",
              )}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <span className="sr-only">{user?.displayName}</span>
    </div>
  );
}

export function AppShellSkeleton() {
  return (
    <div className="min-h-svh bg-page">
      <div className="hidden md:block">
        <div className="fixed inset-y-0 left-0 w-60 border-r border-line bg-page" />
      </div>
      <div className="md:pl-60">
        <div className="h-14 border-b border-line md:hidden" />
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="font-display text-lg font-semibold">StaffPulse</p>
          <p className="mt-1 text-sm text-mute">Loading your workspace…</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-xl bg-panel" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Brand({ orgName, compact }: { orgName: string; compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <StaffPulseMark className="size-8 shrink-0" />
      <span className={cn("min-w-0", compact && "max-w-[11rem]")}>
        <span className="block font-display text-sm font-semibold leading-tight">StaffPulse</span>
        <span className="block truncate text-xs text-mute">{orgName}</span>
      </span>
    </Link>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof LayoutGrid;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex h-11 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors",
        active ? "bg-primary text-primary-fg" : "text-ink hover:bg-panel",
      )}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}

function MobileNav({ pathname, orgName }: { pathname: string; orgName: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Brand orgName={orgName} />
        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map((item) => (
            <span key={item.to} onClick={() => setOpen(false)}>
              <NavLink {...item} active={isActive(pathname, item.to)} />
            </span>
          ))}
        </nav>
        <div className="mt-auto rounded-lg border border-line bg-surface p-3">
          <UserButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}
