import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/app-shell";
import { AuthLoadingScreen, LoginScreen } from "@/components/login-screen";
import { PersonAvatar } from "@/components/person-avatar";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { loadWorkspace } from "@/lib/staff/api";
import { fullName } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <AuthLoadingScreen />;
  if (!user) return <LoginScreen />;
  return (
    <AppShell>
      <Overview />
    </AppShell>
  );
}

function Overview() {
  const user = useCurrentUser();
  const workspace = useQuery({ queryKey: ["workspace"], queryFn: () => loadWorkspace() });

  if (workspace.isLoading) {
    return (
      <div>
        <h1 className="font-display text-3xl font-semibold">Overview</h1>
        <p className="mt-2 text-sm text-mute">Loading your directory…</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-panel" />
          ))}
        </div>
      </div>
    );
  }

  if (workspace.error) {
    return (
      <p className="text-sm text-danger">
        {workspace.error instanceof Error ? workspace.error.message : "Could not load the desk."}
      </p>
    );
  }

  const data = workspace.data;
  if (!data) return null;
  const first = user?.displayName?.split(" ")[0] ?? "there";
  const hour = new Date().getHours();
  const hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-1">
        <p className="text-sm text-mute">{format(new Date(), "EEEE, d MMMM")}</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {hello}, {first}.
        </h1>
        <p className="text-sm text-mute">
          {data.profile.orgName} · {data.stats.total} people in the directory
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Headcount" value={data.stats.total} hint="Everyone on file" />
        <StatCard label="Active" value={data.stats.active} hint="In seat this week" />
        <StatCard label="On leave" value={data.stats.leave} hint="Away from desk" />
        <StatCard label="Offboarding" value={data.stats.offboarding} hint="Closing out" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>By department</CardTitle>
            <CardDescription>Where the headcount sits today</CardDescription>
          </CardHeader>
          <CardContent>
            <DeptChart data={data.stats.byDepartment} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Away from desk</CardTitle>
            <CardDescription>Leave and offboarding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.onLeave.length === 0 ? (
              <p className="text-sm text-mute">Everyone is in. Nice.</p>
            ) : (
              data.onLeave.map((person) => (
                <Link
                  key={person.id}
                  to="/employees/$id"
                  params={{ id: String(person.id) }}
                  className="flex items-center gap-3 rounded-md p-1.5 hover:bg-panel"
                >
                  <PersonAvatar firstName={person.firstName} lastName={person.lastName} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {fullName(person.firstName, person.lastName)}
                    </span>
                    <span className="block truncate text-xs text-mute">{person.title}</span>
                  </span>
                  <StatusBadge status={person.status} />
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Pulse</CardTitle>
          <CardDescription>Recent movement in this workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {data.recentActivity.map((item) => (
              <li key={item.id} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-sm text-ink">{item.detail}</p>
                  <p className="text-xs text-mute">{formatStamp(item.createdAt)}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="font-display text-3xl tabular-nums">{value}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-mute">{hint}</p>
      </CardContent>
    </Card>
  );
}

function DeptChart({ data }: { data: { name: string; count: number }[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="h-56 animate-pulse rounded-lg bg-panel" />;
  if (data.length === 0) return <p className="text-sm text-mute">No departments yet.</p>;
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-mute)" }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--color-mute)" }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "color-mix(in oklab, var(--color-ink) 4%, transparent)" }}
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-line)",
              borderRadius: 12,
              fontSize: 12,
              color: "var(--color-ink)",
            }}
          />
          <Bar dataKey="count" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function formatStamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return format(date, "d MMM, HH:mm");
}
