export const DEPARTMENTS = [
  "Engineering",
  "Design",
  "People",
  "Operations",
  "Sales",
  "Finance",
] as const;

export const STATUSES = [
  { value: "active", label: "Active" },
  { value: "leave", label: "On leave" },
  { value: "offboarding", label: "Offboarding" },
] as const;

export type Department = (typeof DEPARTMENTS)[number];
export type EmployeeStatus = (typeof STATUSES)[number]["value"];
export type AccessRole = "admin" | "editor" | "user";

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  email: string;
  location: string;
  status: EmployeeStatus;
  startDate: string;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeInput = {
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  email: string;
  location: string;
  status: EmployeeStatus;
  startDate: string;
};

export type Profile = {
  userId: string;
  role: AccessRole;
  orgName: string;
};

export type ActivityItem = {
  id: number;
  action: string;
  detail: string;
  createdAt: string;
};

export type DeptCount = { name: string; count: number };

export type Workspace = {
  profile: Profile;
  stats: {
    total: number;
    active: number;
    leave: number;
    offboarding: number;
    byDepartment: DeptCount[];
  };
  recentActivity: ActivityItem[];
  onLeave: Employee[];
};
