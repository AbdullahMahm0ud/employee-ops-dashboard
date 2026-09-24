import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as cn, r as Input } from "./login-screen-Cf3r49e6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee-form-tx5ICXBW.js
var import_jsx_runtime = require_jsx_runtime();
function Select({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("flex h-11 w-full appearance-none rounded-md border border-line bg-surface bg-[length:12px] bg-[right_12px_center] bg-no-repeat px-3 pr-10 text-sm text-ink", "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20", "disabled:cursor-not-allowed disabled:opacity-50", className),
		style: { backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236e675c' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" },
		...props,
		children
	});
}
var DEPARTMENTS = [
	"Engineering",
	"Design",
	"People",
	"Operations",
	"Sales",
	"Finance"
];
var STATUSES = [
	{
		value: "active",
		label: "Active"
	},
	{
		value: "leave",
		label: "On leave"
	},
	{
		value: "offboarding",
		label: "Offboarding"
	}
];
function EmployeeFormFields({ value, onChange }) {
	const set = (key, field) => onChange({
		...value,
		[key]: field
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "First name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					value: value.firstName,
					onChange: (e) => set("firstName", e.target.value),
					autoComplete: "given-name"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Last name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					value: value.lastName,
					onChange: (e) => set("lastName", e.target.value),
					autoComplete: "family-name"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				className: "sm:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					value: value.title,
					onChange: (e) => set("title", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Department",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: value.department,
					onChange: (e) => set("department", e.target.value),
					children: DEPARTMENTS.map((dept) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: dept,
						children: dept
					}, dept))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: value.status,
					onChange: (e) => set("status", e.target.value),
					children: STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: status.value,
						children: status.label
					}, status.value))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Email",
				className: "sm:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					type: "email",
					value: value.email,
					onChange: (e) => set("email", e.target.value),
					autoComplete: "email"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Location",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					value: value.location,
					onChange: (e) => set("location", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Start date",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					type: "date",
					value: value.startDate,
					onChange: (e) => set("startDate", e.target.value)
				})
			})
		]
	});
}
function Field({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-sm font-medium text-ink",
			children: label
		}), children]
	});
}
var emptyEmployee = () => ({
	firstName: "",
	lastName: "",
	title: "",
	department: "Engineering",
	email: "",
	location: "",
	status: "active",
	startDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
});
//#endregion
export { emptyEmployee as a, Select as i, EmployeeFormFields as n, STATUSES as r, DEPARTMENTS as t };
