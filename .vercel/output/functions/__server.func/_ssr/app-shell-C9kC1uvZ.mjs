import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, d as DialogContent, g as DialogTrigger, l as Dialog, m as DialogPortal, p as DialogOverlay, u as DialogClose, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as useRouterState, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { i as authMiddleware, r as ROLE_LABELS } from "./roles-CsrHg0ja.mjs";
import { i as signOut } from "./client-B40BzJxt.mjs";
import { a as hasGateSessionMarker } from "./server-v7saif4i.mjs";
import { c as cn, n as Button, o as StaffPulseMark, u as useCurrentUser } from "./login-screen-Cf3r49e6.mjs";
import { c as LayoutGrid, i as Settings2, l as FolderKanban, s as Menu, t as X } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as createSsrRpc } from "./router-muh3W1A9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-C9kC1uvZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-[min(20rem,calc(100%-1.5rem))] flex-col bg-page p-4 shadow-soft", side === "left" ? "top-0 left-0 border-r border-line" : "top-0 right-0 border-l border-line", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 grid size-11 place-items-center rounded-md text-mute hover:bg-panel hover:text-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var loadWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6dd97b6e2b8fd3d8cba29ddac78a8d35897f42a21d09c8154a29a75ab6c50d94"));
var listEmployees = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((data) => data ?? {}).handler(createSsrRpc("dd12df13cdf250769d37e1f146a51263d7efec4e91eb086be18450bb40edf506"));
var getEmployee = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("66b7319c6e70a1b133303275330d7a8d7a41c7f4e93fa8d9b86e304ac358cf5d"));
var createEmployee = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("8ebacd6d9b04476609bd594187145959f65e83e8ff0043df31d0a7670869e4e6"));
var updateEmployee = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("2810dbc871e22f675cdec31f2aeda1fb723c606244c465dc5c3c52d64b8fab70"));
var deleteEmployee = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("beed94336b23ba957c79d92f5a12c294c766775bda7176b364b04cef44ff54fb"));
var updateWorkspace = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("568530e81ac072a9b32d4279c20574c1264f0ecbf7e444767bc5940d1bf03cf2"));
var NAV = [
	{
		to: "/",
		label: "Overview",
		icon: LayoutGrid
	},
	{
		to: "/directory",
		label: "Directory",
		icon: FolderKanban
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings2
	}
];
function AppShell({ children }) {
	const user = useCurrentUser();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const workspace = useQuery({
		queryKey: ["workspace"],
		queryFn: () => loadWorkspace()
	});
	const orgName = workspace.data?.profile.orgName ?? "StaffPulse";
	const role = workspace.data?.profile.role;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-svh bg-page text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-page px-4 py-5 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { orgName }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-8 flex flex-1 flex-col gap-1",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							...item,
							active: isActive(pathname, item.to)
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-line bg-surface p-3",
						children: [role ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-2 text-xs text-mute",
							children: ["Access · ", ROLE_LABELS[role]]
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:pl-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex items-center justify-between border-b border-line bg-page/90 px-4 py-3 backdrop-blur-sm md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {
						orgName,
						compact: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNav, {
						pathname,
						orgName
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-6xl px-4 py-6 pb-24 md:px-8 md:py-8 md:pb-10",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 grid grid-cols-3 border-t border-line bg-page/95 backdrop-blur-sm md:hidden",
				children: NAV.map((item) => {
					const Icon = item.icon;
					const active = isActive(pathname, item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium", active ? "text-primary" : "text-mute"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.label]
					}, item.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: user?.displayName
			})
		]
	});
}
function Brand({ orgName, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffPulseMark, { className: "size-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("min-w-0", compact && "max-w-[11rem]"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-sm font-semibold leading-tight",
				children: "StaffPulse"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-xs text-mute",
				children: orgName
			})]
		})]
	});
}
function NavLink({ to, label, icon: Icon, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex h-11 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors", active ? "bg-primary text-primary-fg" : "text-ink hover:bg-panel"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
	});
}
function MobileNav({ pathname, orgName }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "icon",
				"aria-label": "Open menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { orgName }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-8 flex flex-col gap-1",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					onClick: () => setOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						...item,
						active: isActive(pathname, item.to)
					})
				}, item.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto rounded-lg border border-line bg-surface p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
			})
		] })]
	});
}
function isActive(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
//#endregion
export { getEmployee as a, updateEmployee as c, deleteEmployee as i, updateWorkspace as l, RedirectToSignIn as n, listEmployees as o, createEmployee as r, loadWorkspace as s, AppShell as t };
