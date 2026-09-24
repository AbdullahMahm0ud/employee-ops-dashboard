import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as useCurrentUserState, t as AuthLoadingScreen } from "./login-screen-Cf3r49e6.mjs";
import { n as RedirectToSignIn, t as AppShell } from "./app-shell-C9kC1uvZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/require-auth-99hOuyQc.js
var import_jsx_runtime = require_jsx_runtime();
function RequireAuth({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLoadingScreen, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children });
}
//#endregion
export { RequireAuth as t };
