import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-Cppn1TFc.mjs";
import { a as canCreate, c as isAccessRole, i as authMiddleware, o as canDelete, s as canUpdate } from "./roles-CsrHg0ja.mjs";
import { t as SEED_EMPLOYEES } from "./seed-CEqPm8Te.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-k4UDOHq7.js
var EMPLOYEE_SELECT = `
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
function requireFields(data) {
	const firstName = data.firstName.trim();
	const lastName = data.lastName.trim();
	if (!firstName || !lastName) throw new Error("First and last names are required.");
	const title = data.title.trim();
	const department = data.department.trim();
	const email = data.email.trim();
	const location = data.location.trim();
	const startDate = data.startDate.trim();
	if (!title || !department || !email || !location || !startDate) throw new Error("Title, department, email, location, and start date are required.");
	if (data.status !== "active" && data.status !== "leave" && data.status !== "offboarding") throw new Error("Invalid status.");
	return {
		firstName,
		lastName,
		title,
		department,
		email,
		location,
		startDate,
		status: data.status
	};
}
async function getProfile(userId) {
	const row = (await (await getSql())`
    select user_id as "userId", role, org_name as "orgName"
    from profiles
    where user_id = ${userId}
  `)[0];
	if (!row) throw new Error("Workspace is missing.");
	return {
		userId: row.userId,
		role: isAccessRole(row.role) ? row.role : "user",
		orgName: row.orgName
	};
}
async function logActivity(userId, action, detail) {
	await (await getSql())`insert into activity (user_id, action, detail) values (${userId}, ${action}, ${detail})`;
}
async function ensureWorkspace(userId) {
	const sql = await getSql();
	if ((await sql`
    select user_id from profiles where user_id = ${userId}
  `)[0]) return;
	await sql`
    insert into profiles (user_id, role, org_name)
    values (${userId}, 'admin', 'Northwind People')
  `;
	for (const person of SEED_EMPLOYEES) await sql`
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
	await logActivity(userId, "workspace", "Opened the Northwind People directory.");
	await logActivity(userId, "hired", "Hired Amira Hassan as product designer.");
	await logActivity(userId, "status", "Noah Adeyemi started parental leave.");
	await logActivity(userId, "status", "Jonah Hale entered offboarding.");
}
var loadWorkspace_createServerFn_handler = createServerRpc({
	id: "6dd97b6e2b8fd3d8cba29ddac78a8d35897f42a21d09c8154a29a75ab6c50d94",
	name: "loadWorkspace",
	filename: "src/lib/staff/api.ts"
}, (opts) => loadWorkspace.__executeServer(opts));
var loadWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadWorkspace_createServerFn_handler, async ({ context }) => {
	await ensureWorkspace(context.userId);
	const sql = await getSql();
	const profile = await getProfile(context.userId);
	const employees = await sql.query(`select ${EMPLOYEE_SELECT} from employees where user_id = $1 order by last_name, first_name`, [context.userId]);
	const activity = await sql.query(`select id, action, detail, created_at::text as "createdAt"
       from activity where user_id = $1
       order by created_at desc limit 8`, [context.userId]);
	const byDepartmentMap = /* @__PURE__ */ new Map();
	for (const person of employees) byDepartmentMap.set(person.department, (byDepartmentMap.get(person.department) ?? 0) + 1);
	const byDepartment = [...byDepartmentMap.entries()].map(([name, count]) => ({
		name,
		count
	})).sort((a, b) => b.count - a.count);
	return {
		profile,
		stats: {
			total: employees.length,
			active: employees.filter((e) => e.status === "active").length,
			leave: employees.filter((e) => e.status === "leave").length,
			offboarding: employees.filter((e) => e.status === "offboarding").length,
			byDepartment
		},
		recentActivity: activity,
		onLeave: employees.filter((e) => e.status === "leave" || e.status === "offboarding")
	};
});
var listEmployees_createServerFn_handler = createServerRpc({
	id: "dd12df13cdf250769d37e1f146a51263d7efec4e91eb086be18450bb40edf506",
	name: "listEmployees",
	filename: "src/lib/staff/api.ts"
}, (opts) => listEmployees.__executeServer(opts));
var listEmployees = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((data) => data ?? {}).handler(listEmployees_createServerFn_handler, async ({ context, data }) => {
	await ensureWorkspace(context.userId);
	const profile = await getProfile(context.userId);
	const rows = await (await getSql()).query(`select ${EMPLOYEE_SELECT} from employees where user_id = $1 order by last_name, first_name`, [context.userId]);
	const q = (data.query ?? "").trim().toLowerCase();
	const department = data.department ?? "";
	const status = data.status ?? "";
	return {
		profile,
		employees: rows.filter((person) => {
			if (department && person.department !== department) return false;
			if (status && person.status !== status) return false;
			if (!q) return true;
			return `${person.firstName} ${person.lastName} ${person.title} ${person.email} ${person.location}`.toLowerCase().includes(q);
		})
	};
});
var getEmployee_createServerFn_handler = createServerRpc({
	id: "66b7319c6e70a1b133303275330d7a8d7a41c7f4e93fa8d9b86e304ac358cf5d",
	name: "getEmployee",
	filename: "src/lib/staff/api.ts"
}, (opts) => getEmployee.__executeServer(opts));
var getEmployee = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((data) => data).handler(getEmployee_createServerFn_handler, async ({ context, data }) => {
	await ensureWorkspace(context.userId);
	return {
		profile: await getProfile(context.userId),
		employee: (await (await getSql()).query(`select ${EMPLOYEE_SELECT} from employees where id = $1 and user_id = $2`, [data.id, context.userId]))[0] ?? null
	};
});
var createEmployee_createServerFn_handler = createServerRpc({
	id: "8ebacd6d9b04476609bd594187145959f65e83e8ff0043df31d0a7670869e4e6",
	name: "createEmployee",
	filename: "src/lib/staff/api.ts"
}, (opts) => createEmployee.__executeServer(opts));
var createEmployee = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createEmployee_createServerFn_handler, async ({ context, data }) => {
	await ensureWorkspace(context.userId);
	const profile = await getProfile(context.userId);
	if (!canCreate(profile.role)) throw new Error("Editors and admins can add people. Switch your access level in Settings.");
	const person = requireFields(data);
	const created = (await (await getSql()).query(`insert into employees (
         user_id, first_name, last_name, title, department, email, location, status, start_date
       ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       returning ${EMPLOYEE_SELECT}`, [
		context.userId,
		person.firstName,
		person.lastName,
		person.title,
		person.department,
		person.email,
		person.location,
		person.status,
		person.startDate
	]))[0];
	if (!created) throw new Error("Could not create employee.");
	await logActivity(context.userId, "hired", `Hired ${person.firstName} ${person.lastName} as ${person.title}.`);
	return created;
});
var updateEmployee_createServerFn_handler = createServerRpc({
	id: "2810dbc871e22f675cdec31f2aeda1fb723c606244c465dc5c3c52d64b8fab70",
	name: "updateEmployee",
	filename: "src/lib/staff/api.ts"
}, (opts) => updateEmployee.__executeServer(opts));
var updateEmployee = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(updateEmployee_createServerFn_handler, async ({ context, data }) => {
	await ensureWorkspace(context.userId);
	const profile = await getProfile(context.userId);
	if (!canUpdate(profile.role)) throw new Error("Editors and admins can update people. Switch your access level in Settings.");
	const person = requireFields(data);
	const updated = (await (await getSql()).query(`update employees set
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
       returning ${EMPLOYEE_SELECT}`, [
		person.firstName,
		person.lastName,
		person.title,
		person.department,
		person.email,
		person.location,
		person.status,
		person.startDate,
		data.id,
		context.userId
	]))[0];
	if (!updated) throw new Error("No employee matches that ID.");
	await logActivity(context.userId, "updated", `Updated ${person.firstName} ${person.lastName}.`);
	return updated;
});
var deleteEmployee_createServerFn_handler = createServerRpc({
	id: "beed94336b23ba957c79d92f5a12c294c766775bda7176b364b04cef44ff54fb",
	name: "deleteEmployee",
	filename: "src/lib/staff/api.ts"
}, (opts) => deleteEmployee.__executeServer(opts));
var deleteEmployee = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(deleteEmployee_createServerFn_handler, async ({ context, data }) => {
	await ensureWorkspace(context.userId);
	const profile = await getProfile(context.userId);
	if (!canDelete(profile.role)) throw new Error("Only admins can remove people. Switch your access level in Settings.");
	const sql = await getSql();
	const person = (await sql.query(`select ${EMPLOYEE_SELECT} from employees where id = $1 and user_id = $2`, [data.id, context.userId]))[0];
	if (!person) throw new Error("No employee matches that ID.");
	await sql.query(`delete from employees where id = $1 and user_id = $2`, [data.id, context.userId]);
	await logActivity(context.userId, "departed", `Removed ${person.firstName} ${person.lastName} from the directory.`);
	return { ok: true };
});
var updateWorkspace_createServerFn_handler = createServerRpc({
	id: "568530e81ac072a9b32d4279c20574c1264f0ecbf7e444767bc5940d1bf03cf2",
	name: "updateWorkspace",
	filename: "src/lib/staff/api.ts"
}, (opts) => updateWorkspace.__executeServer(opts));
var updateWorkspace = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(updateWorkspace_createServerFn_handler, async ({ context, data }) => {
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
	if (role !== current.role) await logActivity(context.userId, "access", `Workspace access set to ${role}.`);
	return getProfile(context.userId);
});
//#endregion
export { createEmployee_createServerFn_handler, deleteEmployee_createServerFn_handler, getEmployee_createServerFn_handler, listEmployees_createServerFn_handler, loadWorkspace_createServerFn_handler, updateEmployee_createServerFn_handler, updateWorkspace_createServerFn_handler };
