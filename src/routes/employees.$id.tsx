import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EmployeeFormFields } from "@/components/employee-form";
import { PersonAvatar } from "@/components/person-avatar";
import { RequireAuth } from "@/components/require-auth";
import { StatusBadge } from "@/components/status-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteEmployee, getEmployee, updateEmployee } from "@/lib/staff/api";
import { canDelete, canUpdate } from "@/lib/staff/roles";
import type { EmployeeInput } from "@/lib/staff/types";
import { fullName } from "@/lib/utils";

export const Route = createFileRoute("/employees/$id")({ component: EmployeePage });

function EmployeePage() {
  return (
    <RequireAuth>
      <EmployeeDetail />
    </RequireAuth>
  );
}

function EmployeeDetail() {
  const { id } = Route.useParams();
  const numericId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<EmployeeInput | null>(null);
  const [confirm, setConfirm] = useState(false);

  const record = useQuery({
    queryKey: ["employee", numericId],
    queryFn: () => getEmployee({ data: { id: numericId } }),
    enabled: Number.isFinite(numericId),
  });

  useEffect(() => {
    const person = record.data?.employee;
    if (!person) return;
    setDraft({
      firstName: person.firstName,
      lastName: person.lastName,
      title: person.title,
      department: person.department,
      email: person.email,
      location: person.location,
      status: person.status,
      startDate: person.startDate,
    });
  }, [record.data]);

  const save = useMutation({
    mutationFn: (data: EmployeeInput) => updateEmployee({ data: { ...data, id: numericId } }),
    onSuccess: async () => {
      toast.success("Record updated.");
      await queryClient.invalidateQueries();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: () => deleteEmployee({ data: { id: numericId } }),
    onSuccess: async () => {
      toast.success("Removed from the directory.");
      await queryClient.invalidateQueries();
      void navigate({ to: "/directory" });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (record.isLoading) {
    return <div className="h-64 animate-pulse rounded-xl bg-panel" />;
  }
  if (record.error) {
    return (
      <p className="text-sm text-danger">
        {record.error instanceof Error ? record.error.message : "Could not load this person."}
      </p>
    );
  }

  const person = record.data?.employee;
  const profile = record.data?.profile;
  if (!person || !draft) {
    return (
      <div className="rounded-xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
        <p className="font-display text-lg font-semibold">No one with that ID</p>
        <Link to="/directory" className="mt-3 inline-block text-sm text-primary hover:underline">
          Back to directory
        </Link>
      </div>
    );
  }

  const editable = profile ? canUpdate(profile.role) : false;
  const removable = profile ? canDelete(profile.role) : false;

  return (
    <div className="space-y-6">
      <Link to="/directory" className="inline-flex h-11 items-center gap-2 text-sm text-mute hover:text-ink">
        <ArrowLeft className="size-4" />
        Directory
      </Link>

      <Card>
        <CardContent className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center">
          <PersonAvatar firstName={person.firstName} lastName={person.lastName} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              {fullName(person.firstName, person.lastName)}
            </h1>
            <p className="mt-1 text-sm text-mute">
              {person.title} · {person.department} · {person.location}
            </p>
          </div>
          <StatusBadge status={person.status} />
        </CardContent>
      </Card>

      <form
        className="space-y-4 rounded-xl border border-line bg-surface p-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (editable) save.mutate(draft);
        }}
      >
        <fieldset disabled={!editable} className="space-y-4 disabled:opacity-80">
          <EmployeeFormFields value={draft} onChange={setDraft} />
        </fieldset>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          {removable ? (
            <Button type="button" variant="danger" onClick={() => setConfirm(true)}>
              <Trash2 className="size-4" />
              Remove
            </Button>
          ) : (
            <span />
          )}
          {editable ? (
            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? "Saving…" : "Save changes"}
            </Button>
          ) : (
            <p className="text-sm text-mute">Viewer access is read-only. Change it in Settings.</p>
          )}
        </div>
      </form>

      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this person?</AlertDialogTitle>
            <AlertDialogDescription>
              {fullName(person.firstName, person.lastName)} will leave your directory. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                remove.mutate();
              }}
            >
              {remove.isPending ? "Removing…" : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
