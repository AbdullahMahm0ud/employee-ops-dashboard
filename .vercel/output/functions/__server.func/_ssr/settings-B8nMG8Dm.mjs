import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as ROLE_CODES, r as ROLE_LABELS, t as ROLE_BLURBS } from "./roles-CsrHg0ja.mjs";
import { c as cn, n as Button, r as Input, u as useCurrentUser } from "./login-screen-Cf3r49e6.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as updateWorkspace, s as loadWorkspace } from "./app-shell-C9kC1uvZ.mjs";
import { t as RequireAuth } from "./require-auth-99hOuyQc.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-C-91VTxP.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-B8nMG8Dm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-sm font-medium text-ink", className),
		...props
	});
}
var ROLES = [
	"admin",
	"editor",
	"user"
];
function SettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {}) });
}
function Settings() {
	const user = useCurrentUser();
	const queryClient = useQueryClient();
	const workspace = useQuery({
		queryKey: ["workspace"],
		queryFn: () => loadWorkspace()
	});
	const [orgName, setOrgName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("admin");
	(0, import_react.useEffect)(() => {
		if (!workspace.data) return;
		setOrgName(workspace.data.profile.orgName);
		setRole(workspace.data.profile.role);
	}, [workspace.data]);
	const save = useMutation({
		mutationFn: () => updateWorkspace({ data: {
			orgName,
			role
		} }),
		onSuccess: async () => {
			toast.success("Workspace updated.");
			await queryClient.invalidateQueries();
		},
		onError: (err) => toast.error(err.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-mute",
				children: "Workspace name and the same Admin / Editor / Viewer access model as the original API."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Signed in as this identity" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-1 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: user?.displayName ?? "Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-mute",
					children: user?.primaryEmail ?? "No email on file"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Company name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Shown in the sidebar and on the overview" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1.5 block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: orgName,
					onChange: (e) => setOrgName(e.target.value)
				})]
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Workspace access" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Mirrors the original JWT roles — Viewer 2001, Editor 1984, Admin 5150. This is your desk, so you can switch the level to feel the permission gates." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "grid gap-3",
				children: ROLES.map((item) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setRole(item),
						className: cn("rounded-lg border px-4 py-3 text-left transition-colors", role === item ? "border-primary bg-primary/8" : "border-line bg-surface hover:bg-panel"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: ROLE_LABELS[item]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-mute tabular-nums",
								children: ROLE_CODES[item]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-mute",
							children: ROLE_BLURBS[item]
						})]
					}, item);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => save.mutate(),
					disabled: save.isPending || workspace.isLoading,
					children: save.isPending ? "Saving…" : "Save settings"
				})
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
