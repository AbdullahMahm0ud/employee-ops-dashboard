import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roles-CsrHg0ja.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-B40BzJxt.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-Ds6FpSR2.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
/** Same numeric codes as the original JWT API (Dave Gray tutorial). */
var ROLE_CODES = {
	admin: 5150,
	editor: 1984,
	user: 2001
};
var ROLE_LABELS = {
	admin: "Admin",
	editor: "Editor",
	user: "Viewer"
};
var ROLE_BLURBS = {
	admin: "Full directory control, including deleting people.",
	editor: "Can add and update people. Cannot delete.",
	user: "Read-only access to the directory."
};
function canCreate(role) {
	return role === "admin" || role === "editor";
}
function canUpdate(role) {
	return role === "admin" || role === "editor";
}
function canDelete(role) {
	return role === "admin";
}
function isAccessRole(value) {
	return value === "admin" || value === "editor" || value === "user";
}
//#endregion
export { canCreate as a, isAccessRole as c, authMiddleware as i, ROLE_CODES as n, canDelete as o, ROLE_LABELS as r, canUpdate as s, ROLE_BLURBS as t };
