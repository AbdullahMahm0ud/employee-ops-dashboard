import { Badge } from "@/components/ui/badge";
import type { EmployeeStatus } from "@/lib/staff/types";

const TONE: Record<EmployeeStatus, "success" | "warn" | "danger"> = {
  active: "success",
  leave: "warn",
  offboarding: "danger",
};

const LABEL: Record<EmployeeStatus, string> = {
  active: "Active",
  leave: "On leave",
  offboarding: "Offboarding",
};

export function StatusBadge({ status }: { status: EmployeeStatus }) {
  return <Badge tone={TONE[status]}>{LABEL[status]}</Badge>;
}
