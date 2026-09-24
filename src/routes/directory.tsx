import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { emptyEmployee, EmployeeFormFields } from "@/components/employee-form";
import { PersonAvatar } from "@/components/person-avatar";
import { RequireAuth } from "@/components/require-auth";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { createEmployee, listEmployees } from "@/lib/staff/api";
import { canCreate } from "@/lib/staff/roles";
import { DEPARTMENTS, STATUSES, type EmployeeInput } from "@/lib/staff/types";
import { fullName } from "@/lib/utils";

export const Route = createFileRoute("/directory")({ component: DirectoryPage });

function DirectoryPage() {
  return (
    <RequireAuth>
      <Directory />
    </RequireAuth>
  );
}

function Directory() {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<EmployeeInput>(emptyEmployee());

  const filters = useMemo(() => ({ query, department, status }), [query, department, status]);
  const list = useQuery({
    queryKey: ["employees", filters],
    queryFn: () => listEmployees({ data: filters }),
  });

  const create = useMutation({
    mutationFn: (data: EmployeeInput) => createEmployee({ data }),
    onSuccess: async () => {
      toast.success("Person added to the directory.");
      setOpen(false);
      setDraft(emptyEmployee());
      await queryClient.invalidateQueries();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const profile = list.data?.profile;
  const employees = list.data?.employees ?? [];
  const allowCreate = profile ? canCreate(profile.role) : false;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Directory</h1>
          <p className="mt-1 text-sm text-mute">
            {list.isLoading ? "Loading people…" : `${employees.length} people`}
          </p>
        </div>
        {allowCreate ? (
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            Add person
          </Button>
        ) : null}
      </header>

      <div className="grid gap-3 sm:grid-cols-[1fr_10rem_10rem]">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" />
          <Input
            className="pl-10"
            placeholder="Search name, title, location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All desks</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </Select>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>

      {list.error ? (
        <p className="text-sm text-danger">
          {list.error instanceof Error ? list.error.message : "Could not load people."}
        </p>
      ) : null}

      {list.isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-panel" />
          ))}
        </div>
      ) : employees.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold">No one matches</p>
          <p className="mt-1 text-sm text-mute">Try a different search, or add the first person.</p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-line bg-surface md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-panel text-xs tracking-wide text-mute uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((person) => (
                  <tr key={person.id} className="border-t border-line hover:bg-panel/60">
                    <td className="px-4 py-3">
                      <Link
                        to="/employees/$id"
                        params={{ id: String(person.id) }}
                        className="flex items-center gap-3 font-medium"
                      >
                        <PersonAvatar firstName={person.firstName} lastName={person.lastName} size="sm" />
                        {fullName(person.firstName, person.lastName)}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-mute">{person.title}</td>
                    <td className="px-4 py-3">{person.department}</td>
                    <td className="px-4 py-3 text-mute">{person.location}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={person.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 md:hidden">
            {employees.map((person) => (
              <Link
                key={person.id}
                to="/employees/$id"
                params={{ id: String(person.id) }}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4"
              >
                <PersonAvatar firstName={person.firstName} lastName={person.lastName} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">
                    {fullName(person.firstName, person.lastName)}
                  </span>
                  <span className="block truncate text-sm text-mute">
                    {person.title} · {person.department}
                  </span>
                </span>
                <StatusBadge status={person.status} />
              </Link>
            ))}
          </div>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add person</DialogTitle>
            <DialogDescription>Creates a record in your private directory.</DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              create.mutate(draft);
            }}
          >
            <EmployeeFormFields value={draft} onChange={setDraft} />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={create.isPending}>
                {create.isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
