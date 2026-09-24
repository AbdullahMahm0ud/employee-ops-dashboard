import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { loadWorkspace, updateWorkspace } from "@/lib/staff/api";
import { ROLE_BLURBS, ROLE_CODES, ROLE_LABELS } from "@/lib/staff/roles";
import type { AccessRole } from "@/lib/staff/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

const ROLES: AccessRole[] = ["admin", "editor", "user"];

function SettingsPage() {
  return (
    <RequireAuth>
      <Settings />
    </RequireAuth>
  );
}

function Settings() {
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  const workspace = useQuery({ queryKey: ["workspace"], queryFn: () => loadWorkspace() });
  const [orgName, setOrgName] = useState("");
  const [role, setRole] = useState<AccessRole>("admin");

  useEffect(() => {
    if (!workspace.data) return;
    setOrgName(workspace.data.profile.orgName);
    setRole(workspace.data.profile.role);
  }, [workspace.data]);

  const save = useMutation({
    mutationFn: () => updateWorkspace({ data: { orgName, role } }),
    onSuccess: async () => {
      toast.success("Workspace updated.");
      await queryClient.invalidateQueries();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-mute">Workspace name and the same Admin / Editor / Viewer access model as the original API.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Signed in as this identity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p className="font-medium">{user?.displayName ?? "Account"}</p>
          <p className="text-mute">{user?.primaryEmail ?? "No email on file"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company name</CardTitle>
          <CardDescription>Shown in the sidebar and on the overview</CardDescription>
        </CardHeader>
        <CardContent>
          <label className="block max-w-md">
            <span className="mb-1.5 block">
              <Label>Name</Label>
            </span>
            <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workspace access</CardTitle>
          <CardDescription>
            Mirrors the original JWT roles — Viewer 2001, Editor 1984, Admin 5150. This is your desk, so you can
            switch the level to feel the permission gates.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {ROLES.map((item) => {
            const selected = role === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={cn(
                  "rounded-lg border px-4 py-3 text-left transition-colors",
                  selected ? "border-primary bg-primary/8" : "border-line bg-surface hover:bg-panel",
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-medium">{ROLE_LABELS[item]}</span>
                  <span className="font-mono text-xs text-mute tabular-nums">{ROLE_CODES[item]}</span>
                </span>
                <span className="mt-1 block text-sm text-mute">{ROLE_BLURBS[item]}</span>
              </button>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => save.mutate()} disabled={save.isPending || workspace.isLoading}>
          {save.isPending ? "Saving…" : "Save settings"}
        </Button>
      </div>
    </div>
  );
}
