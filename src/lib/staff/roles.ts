import type { AccessRole } from "./types";

/** Same numeric codes as the original JWT API (Dave Gray tutorial). */
export const ROLE_CODES: Record<AccessRole, number> = {
  admin: 5150,
  editor: 1984,
  user: 2001,
};

export const ROLE_LABELS: Record<AccessRole, string> = {
  admin: "Admin",
  editor: "Editor",
  user: "Viewer",
};

export const ROLE_BLURBS: Record<AccessRole, string> = {
  admin: "Full directory control, including deleting people.",
  editor: "Can add and update people. Cannot delete.",
  user: "Read-only access to the directory.",
};

export function canCreate(role: AccessRole) {
  return role === "admin" || role === "editor";
}

export function canUpdate(role: AccessRole) {
  return role === "admin" || role === "editor";
}

export function canDelete(role: AccessRole) {
  return role === "admin";
}

export function isAccessRole(value: string): value is AccessRole {
  return value === "admin" || value === "editor" || value === "user";
}
