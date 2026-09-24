import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { canCreate, canDelete, canUpdate, isAccessRole } from "./roles";
import { SEED_EMPLOYEES } from "./seed";
import type {
  AccessRole,
  ActivityItem,
  DeptCount,
  Employee,
  EmployeeInput,
  EmployeeStatus,
  Profile,
  Workspace,
} from "./types";

type EmployeeRow = {
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

const EMPLOYEE_SELECT = `
  id,
  first_name as "firstName",
  last_name as "lastName",
  title,
  department,
  email,
  location,
  status,
  start_date as "startDate",
  created_at::text as "createdAt",
  updated_at::text as "updatedAt"
`;

function requireFields(data: EmployeeInput) {
  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  if (!firstName || !lastName) {
    throw new Error("First and last names are required.");
  }
  const title = data.title.trim();
  const department = data.department.trim();
  const email = data.email.trim();
  const location = data.location.trim();
  const startDate = data.startDate.trim();
  if (!title || !department || !email || !location || !startDate) {
    throw new Error("Title, department, email, location, and start date are required.");
  }
  if (data.status !== "active" && data.status !== "leave" && data.status !== "offboarding") {
    throw new Error("Invalid status.");
  }
  return { firstName, lastName, title, department, email, location, startDate, status: data.status };
}

async function getProfile(userId: string): Promise<Profile> {
  const sql = await getSql();
  const rows = await sql<Profile>`
    select user_id as "userId", role, org_name as "orgName"
    from profiles
    where user_id = ${userId}
  `;
  const row = rows[0];
  if (!row) throw new Error("Workspace is missing.");
  return {
    userId: row.userId,
    role: isAccessRole(row.role) ? row.role : "user",
    orgName: row.orgName,
  };
}

async function logActivity(userId: string, action: string, detail: string) {
  const sql = await getSql();
  await sql`insert into activity (user_id, action, detail) values (${userId}, ${action}, ${detail})`;
}

async function ensureWorkspace(userId: string) {
  const sql = await getSql();
  const existing = await sql<{ user_id: string }>`
    select user_id from profiles where user_id = ${userId}
  `;
  if (existing[0]) return;

  await sql`
    insert into profiles (user_id, role, org_name)
    values (${userId}, 'admin', 'Northwind People')
  `;

  for (const person of SEED_EMPLOYEES) {
    await sql`
      insert into employees (
        user_id, first_name, last_name, title, department, email, location, status, start_date
      ) values (
        ${userId},
        ${person.firstName},
        ${person.lastName},
        ${person.title},
        ${person.department},
        ${person.email},
        ${person.location},
        ${person.status},
        ${person.startDate}
      )
    `;
  }

  await logActivity(userId, "workspace", "Opened the Northwind People directory.");
  await logActivity(userId, "hired", "Hired Amira Hassan as product designer.");
  await logActivity(userId, "status", "Noah Adeyemi started parental leave.");
  await logActivity(userId, "status", "Jonah Hale entered offboarding.");
}

export const loadWorkspace = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Workspace> => {
    await ensureWorkspace(context.userId);
    const sql = await getSql();
    const profile = await getProfile(context.userId);
    const employees = await sql.query<EmployeeRow>(
      `select ${EMPLOYEE_SELECT} from employees where user_id = $1 order by last_name, first_name`,
      [context.userId],
    );
    const activity = await sql.query<ActivityItem>(
      `select id, action, detail, created_at::text as "createdAt"
       from activity where user_id = $1
       order by created_at desc limit 8`,
      [context.userId],
    );

    const byDepartmentMap = new Map<string, number>();
    for (const person of employees) {
      byDepartmentMap.set(person.department, (byDepartmentMap.get(person.department) ?? 0) + 1);
    }
    const byDepartment: DeptCount[] = [...byDepartmentMap.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      profile,
      stats: {
        total: employees.length,
        active: employees.filter((e) => e.status === "active").length,
        leave: employees.filter((e) => e.status === "leave").length,
        offboarding: employees.filter((e) => e.status === "offboarding").length,
        byDepartment,
      },
      recentActivity: activity,
      onLeave: employees.filter((e) => e.status === "leave" || e.status === "offboarding"),
    };
  });

export const listEmployees = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data?: { query?: string; department?: string; status?: string }) => data ?? {})
  .handler(async ({ context, data }): Promise<{ profile: Profile; employees: Employee[] }> => {
    await ensureWorkspace(context.userId);
    const profile = await getProfile(context.userId);
    const sql = await getSql();
    const rows = await sql.query<EmployeeRow>(
      `select ${EMPLOYEE_SELECT} from employees where user_id = $1 order by last_name, first_name`,
      [context.userId],
    );
    const q = (data.query ?? "").trim().toLowerCase();
    const department = data.department ?? "";
    const status = data.status ?? "";
    const employees = rows.filter((person) => {
      if (department && person.department !== department) return false;
      if (status && person.status !== status) return false;
      if (!q) return true;
      const haystack = `${person.firstName} ${person.lastName} ${person.title} ${person.email} ${person.location}`.toLowerCase();
      return haystack.includes(q);
    });
    return { profile, employees };
  });

export const getEmployee = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data: { id: number }) => data)
  .handler(async ({ context, data }): Promise<{ profile: Profile; employee: Employee | null }> => {
    await ensureWorkspace(context.userId);
    const profile = await getProfile(context.userId);
    const sql = await getSql();
    const rows = await sql.query<EmployeeRow>(
      `select ${EMPLOYEE_SELECT} from employees where id = $1 and user_id = $2`,
      [data.id, context.userId],
    );
    return { profile, employee: rows[0] ?? null };
  });

export const createEmployee = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: EmployeeInput) => data)
  .handler(async ({ context, data }): Promise<Employee> => {
    await ensureWorkspace(context.userId);
    const profile = await getProfile(context.userId);
    if (!canCreate(profile.role)) {
      throw new Error("Editors and admins can add people. Switch your access level in Settings.");
    }
    const person = requireFields(data);
    const sql = await getSql();
    const rows = await sql.query<EmployeeRow>(
      `insert into employees (
         user_id, first_name, last_name, title, department, email, location, status, start_date
       ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       returning ${EMPLOYEE_SELECT}`,
      [
        context.userId,
        person.firstName,
        person.lastName,
        person.title,
        person.department,
        person.email,
        person.location,
        person.status,
        person.startDate,
      ],
    );
    const created = rows[0];
    if (!created) throw new Error("Could not create employee.");
    await logActivity(
      context.userId,
      "hired",
      `Hired ${person.firstName} ${person.lastName} as ${person.title}.`,
    );
    return created;
  });

export const updateEmployee = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: EmployeeInput & { id: number }) => data)
  .handler(async ({ context, data }): Promise<Employee> => {
    await ensureWorkspace(context.userId);
    const profile = await getProfile(context.userId);
    if (!canUpdate(profile.role)) {
      throw new Error("Editors and admins can update people. Switch your access level in Settings.");
    }
    const person = requireFields(data);
    const sql = await getSql();
    const rows = await sql.query<EmployeeRow>(
      `update employees set
         first_name = $1,
         last_name = $2,
         title = $3,
         department = $4,
         email = $5,
         location = $6,
         status = $7,
         start_date = $8,
         updated_at = now()
       where id = $9 and user_id = $10
       returning ${EMPLOYEE_SELECT}`,
      [
        person.firstName,
        person.lastName,
        person.title,
        person.department,
        person.email,
        person.location,
        person.status,
        person.startDate,
        data.id,
        context.userId,
      ],
    );
    const updated = rows[0];
    if (!updated) throw new Error("No employee matches that ID.");
    await logActivity(
      context.userId,
      "updated",
      `Updated ${person.firstName} ${person.lastName}.`,
    );
    return updated;
  });

export const deleteEmployee = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number }) => data)
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await ensureWorkspace(context.userId);
    const profile = await getProfile(context.userId);
    if (!canDelete(profile.role)) {
      throw new Error("Only admins can remove people. Switch your access level in Settings.");
    }
    const sql = await getSql();
    const existing = await sql.query<EmployeeRow>(
      `select ${EMPLOYEE_SELECT} from employees where id = $1 and user_id = $2`,
      [data.id, context.userId],
    );
    const person = existing[0];
    if (!person) throw new Error("No employee matches that ID.");
    await sql.query(`delete from employees where id = $1 and user_id = $2`, [
      data.id,
      context.userId,
    ]);
    await logActivity(
      context.userId,
      "departed",
      `Removed ${person.firstName} ${person.lastName} from the directory.`,
    );
    return { ok: true };
  });

export const updateWorkspace = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { orgName?: string; role?: AccessRole }) => data)
  .handler(async ({ context, data }): Promise<Profile> => {
    await ensureWorkspace(context.userId);
    const sql = await getSql();
    const current = await getProfile(context.userId);
    const orgName = (data.orgName ?? current.orgName).trim() || current.orgName;
    const role = data.role && isAccessRole(data.role) ? data.role : current.role;
    await sql`
      update profiles
      set org_name = ${orgName}, role = ${role}
      where user_id = ${context.userId}
    `;
    if (role !== current.role) {
      await logActivity(context.userId, "access", `Workspace access set to ${role}.`);
    }
    return getProfile(context.userId);
  });
