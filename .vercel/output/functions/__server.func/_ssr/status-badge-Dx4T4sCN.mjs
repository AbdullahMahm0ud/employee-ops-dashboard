import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { c as cn } from "./login-screen-Cf3r49e6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-Dx4T4sCN.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
	variants: { tone: {
		default: "bg-panel text-ink",
		primary: "bg-primary/12 text-primary",
		success: "bg-success/12 text-success",
		warn: "bg-warn/12 text-warn",
		danger: "bg-danger/12 text-danger"
	} },
	defaultVariants: { tone: "default" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
var TONE = {
	active: "success",
	leave: "warn",
	offboarding: "danger"
};
var LABEL = {
	active: "Active",
	leave: "On leave",
	offboarding: "Offboarding"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: TONE[status],
		children: LABEL[status]
	});
}
//#endregion
export { StatusBadge as t };
