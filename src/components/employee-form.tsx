import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DEPARTMENTS, STATUSES, type EmployeeInput } from "@/lib/staff/types";

export function EmployeeFormFields({
  value,
  onChange,
}: {
  value: EmployeeInput;
  onChange: (next: EmployeeInput) => void;
}) {
  const set = <K extends keyof EmployeeInput>(key: K, field: EmployeeInput[K]) =>
    onChange({ ...value, [key]: field });

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="First name">
        <Input
          required
          value={value.firstName}
          onChange={(e) => set("firstName", e.target.value)}
          autoComplete="given-name"
        />
      </Field>
      <Field label="Last name">
        <Input
          required
          value={value.lastName}
          onChange={(e) => set("lastName", e.target.value)}
          autoComplete="family-name"
        />
      </Field>
      <Field label="Title" className="sm:col-span-2">
        <Input required value={value.title} onChange={(e) => set("title", e.target.value)} />
      </Field>
      <Field label="Department">
        <Select value={value.department} onChange={(e) => set("department", e.target.value)}>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Status">
        <Select
          value={value.status}
          onChange={(e) => set("status", e.target.value as EmployeeInput["status"])}
        >
          {STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Email" className="sm:col-span-2">
        <Input
          required
          type="email"
          value={value.email}
          onChange={(e) => set("email", e.target.value)}
          autoComplete="email"
        />
      </Field>
      <Field label="Location">
        <Input required value={value.location} onChange={(e) => set("location", e.target.value)} />
      </Field>
      <Field label="Start date">
        <Input
          required
          type="date"
          value={value.startDate}
          onChange={(e) => set("startDate", e.target.value)}
        />
      </Field>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

export const emptyEmployee = (): EmployeeInput => ({
  firstName: "",
  lastName: "",
  title: "",
  department: "Engineering",
  email: "",
  location: "",
  status: "active",
  startDate: new Date().toISOString().slice(0, 10),
});
