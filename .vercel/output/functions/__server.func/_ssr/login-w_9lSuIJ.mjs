import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useCurrentUserState, i as LoginScreen, t as AuthLoadingScreen } from "./login-screen-Cf3r49e6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-w_9lSuIJ.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLoadingScreen, {});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginScreen, {});
}
//#endregion
export { Login as component };
