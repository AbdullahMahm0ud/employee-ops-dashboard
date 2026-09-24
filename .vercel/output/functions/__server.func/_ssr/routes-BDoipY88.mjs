import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PersonAvatar, d as useCurrentUserState, i as LoginScreen, l as fullName, t as AuthLoadingScreen, u as useCurrentUser } from "./login-screen-Cf3r49e6.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as loadWorkspace, t as AppShell } from "./app-shell-C9kC1uvZ.mjs";
import { t as StatusBadge } from "./status-badge-Dx4T4sCN.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-C-91VTxP.mjs";
import { t as format } from "../_libs/date-fns.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BDoipY88.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLoadingScreen, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {}) });
}
function Overview() {
	const user = useCurrentUser();
	const workspace = useQuery({
		queryKey: ["workspace"],
		queryFn: () => loadWorkspace()
	});
	if (workspace.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Overview"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-mute",
			children: "Loading your directory…"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 animate-pulse rounded-xl bg-panel" }, i))
		})
	] });
	if (workspace.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-danger",
		children: workspace.error instanceof Error ? workspace.error.message : "Could not load the desk."
	});
	const data = workspace.data;
	if (!data) return null;
	const first = user?.displayName?.split(" ")[0] ?? "there";
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mute",
						children: format(/* @__PURE__ */ new Date(), "EEEE, d MMMM")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-3xl font-semibold tracking-tight md:text-4xl",
						children: [
							hello,
							", ",
							first,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mute",
						children: [
							data.profile.orgName,
							" · ",
							data.stats.total,
							" people in the directory"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Headcount",
						value: data.stats.total,
						hint: "Everyone on file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Active",
						value: data.stats.active,
						hint: "In seat this week"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "On leave",
						value: data.stats.leave,
						hint: "Away from desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Offboarding",
						value: data.stats.offboarding,
						hint: "Closing out"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "By department" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Where the headcount sits today" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeptChart, { data: data.stats.byDepartment }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Away from desk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Leave and offboarding" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-3",
					children: data.onLeave.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mute",
						children: "Everyone is in. Nice."
					}) : data.onLeave.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/employees/$id",
						params: { id: String(person.id) },
						className: "flex items-center gap-3 rounded-md p-1.5 hover:bg-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonAvatar, {
								firstName: person.firstName,
								lastName: person.lastName,
								size: "sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-medium",
									children: fullName(person.firstName, person.lastName)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-xs text-mute",
									children: person.title
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: person.status })
						]
					}, person.id))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Recent movement in this workspace" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-4",
				children: data.recentActivity.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-2 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink",
						children: item.detail
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-mute",
						children: formatStamp(item.createdAt)
					})] })]
				}, item.id))
			}) })] })
		]
	});
}
function StatCard({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
		className: "font-display text-3xl tabular-nums",
		children: value
	})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
		className: "pt-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-mute",
			children: hint
		})
	})] });
}
function DeptChart({ data }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-56 animate-pulse rounded-lg bg-panel" });
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-mute",
		children: "No departments yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: -16,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: {
							fontSize: 11,
							fill: "var(--color-mute)"
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						allowDecimals: false,
						tick: {
							fontSize: 11,
							fill: "var(--color-mute)"
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						cursor: { fill: "color-mix(in oklab, var(--color-ink) 4%, transparent)" },
						contentStyle: {
							background: "var(--color-surface)",
							border: "1px solid var(--color-line)",
							borderRadius: 12,
							fontSize: 12,
							color: "var(--color-ink)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "count",
						fill: "var(--color-primary)",
						radius: [
							6,
							6,
							0,
							0
						]
					})
				]
			})
		})
	});
}
function formatStamp(value) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return format(date, "d MMM, HH:mm");
}
//#endregion
export { Home as component };
