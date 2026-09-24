import { o as __toESM } from "../_runtime.mjs";
import { a as Overlay2, b as require_jsx_runtime, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as canDelete, s as canUpdate } from "./roles-CsrHg0ja.mjs";
import { a as PersonAvatar, c as cn, l as fullName, n as Button, s as buttonVariants } from "./login-screen-Cf3r49e6.mjs";
import { n as EmployeeFormFields } from "./employee-form-tx5ICXBW.mjs";
import { r as Trash2, u as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route$1 } from "./router-muh3W1A9.mjs";
import { a as getEmployee, c as updateEmployee, i as deleteEmployee } from "./app-shell-C9kC1uvZ.mjs";
import { t as RequireAuth } from "./require-auth-99hOuyQc.mjs";
import { t as StatusBadge } from "./status-badge-Dx4T4sCN.mjs";
import { n as CardContent, t as Card } from "./card-C-91VTxP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employees._id-DWHPfSyc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AlertDialog = Root2;
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-surface p-5 shadow-soft", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("space-y-1", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		className: cn("font-display text-xl font-semibold text-ink", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		className: cn("text-sm text-mute", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "outline" }), className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants({ variant: "danger" }), className),
		...props
	});
}
function EmployeePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeDetail, {}) });
}
function EmployeeDetail() {
	const { id } = Route$1.useParams();
	const numericId = Number(id);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const record = useQuery({
		queryKey: ["employee", numericId],
		queryFn: () => getEmployee({ data: { id: numericId } }),
		enabled: Number.isFinite(numericId)
	});
	(0, import_react.useEffect)(() => {
		const person = record.data?.employee;
		if (!person) return;
		setDraft({
			firstName: person.firstName,
			lastName: person.lastName,
			title: person.title,
			department: person.department,
			email: person.email,
			location: person.location,
			status: person.status,
			startDate: person.startDate
		});
	}, [record.data]);
	const save = useMutation({
		mutationFn: (data) => updateEmployee({ data: {
			...data,
			id: numericId
		} }),
		onSuccess: async () => {
			toast.success("Record updated.");
			await queryClient.invalidateQueries();
		},
		onError: (err) => toast.error(err.message)
	});
	const remove = useMutation({
		mutationFn: () => deleteEmployee({ data: { id: numericId } }),
		onSuccess: async () => {
			toast.success("Removed from the directory.");
			await queryClient.invalidateQueries();
			navigate({ to: "/directory" });
		},
		onError: (err) => toast.error(err.message)
	});
	if (record.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-xl bg-panel" });
	if (record.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-danger",
		children: record.error instanceof Error ? record.error.message : "Could not load this person."
	});
	const person = record.data?.employee;
	const profile = record.data?.profile;
	if (!person || !draft) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg font-semibold",
			children: "No one with that ID"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/directory",
			className: "mt-3 inline-block text-sm text-primary hover:underline",
			children: "Back to directory"
		})]
	});
	const editable = profile ? canUpdate(profile.role) : false;
	const removable = profile ? canDelete(profile.role) : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/directory",
				className: "inline-flex h-11 items-center gap-2 text-sm text-mute hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Directory"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-4 pt-5 sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonAvatar, {
						firstName: person.firstName,
						lastName: person.lastName,
						size: "lg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-semibold tracking-tight",
							children: fullName(person.firstName, person.lastName)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-mute",
							children: [
								person.title,
								" · ",
								person.department,
								" · ",
								person.location
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: person.status })
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-4 rounded-xl border border-line bg-surface p-5",
				onSubmit: (event) => {
					event.preventDefault();
					if (editable) save.mutate(draft);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fieldset", {
					disabled: !editable,
					className: "space-y-4 disabled:opacity-80",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeFormFields, {
						value: draft,
						onChange: setDraft
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-between",
					children: [removable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "danger",
						onClick: () => setConfirm(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Remove"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: save.isPending,
						children: save.isPending ? "Saving…" : "Save changes"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mute",
						children: "Viewer access is read-only. Change it in Settings."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirm,
				onOpenChange: setConfirm,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Remove this person?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [fullName(person.firstName, person.lastName), " will leave your directory. This cannot be undone."] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: (event) => {
						event.preventDefault();
						remove.mutate();
					},
					children: remove.isPending ? "Removing…" : "Remove"
				})] })] })
			})
		]
	});
}
//#endregion
export { EmployeePage as component };
