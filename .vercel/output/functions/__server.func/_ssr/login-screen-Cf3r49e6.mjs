import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Slot, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as SEED_EMPLOYEES } from "./seed-CEqPm8Te.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-v7saif4i.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-screen-Cf3r49e6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function initials(first, last) {
	return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}
function fullName(first, last) {
	return `${first} ${last}`.trim();
}
function avatarTone(name) {
	const tones = [
		"bg-primary/15 text-primary",
		"bg-ink/10 text-ink",
		"bg-warn/15 text-warn",
		"bg-success/15 text-success",
		"bg-line text-ink"
	];
	let hash = 0;
	for (let i = 0; i < name.length; i += 1) hash = (hash + name.charCodeAt(i) * (i + 1)) % tones.length;
	return tones[hash] ?? tones[0];
}
function Input({ className, type = "text", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink shadow-none transition-colors placeholder:text-faint", "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function PersonAvatar({ firstName, lastName, size = "md", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("grid shrink-0 place-items-center rounded-full font-display font-semibold", size === "lg" ? "size-16 text-xl" : size === "sm" ? "size-9 text-xs" : "size-11 text-sm", avatarTone(`${firstName}${lastName}`), className),
		"aria-hidden": "true",
		children: initials(firstName, lastName)
	});
}
function StaffPulseMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "14",
				width: "4",
				height: "10",
				rx: "1",
				className: "fill-primary-fg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14",
				y: "8",
				width: "4",
				height: "16",
				rx: "1",
				className: "fill-primary-fg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "20",
				y: "12",
				width: "4",
				height: "12",
				rx: "1",
				className: "fill-primary-fg"
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:bg-primary-hover",
			secondary: "bg-panel text-ink hover:bg-line",
			outline: "border border-line bg-surface text-ink hover:bg-panel",
			ghost: "text-ink hover:bg-panel",
			danger: "bg-danger text-danger-fg hover:opacity-90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
function LoginScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-svh bg-page lg:grid-cols-[1.1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative hidden overflow-hidden bg-primary px-10 py-12 text-primary-fg lg:flex lg:flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffPulseMark, { className: "size-10 brightness-0 invert" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-semibold",
						children: "StaffPulse"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-semibold tracking-tight",
							children: "The people desk for teams that actually know each other."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-primary-fg/80",
							children: "Directory, access roles, and a quiet pulse on who is in, out, or heading for the door."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-8 grid grid-cols-3 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									n: "12",
									label: "People"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									n: "6",
									label: "Desks"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									n: "3",
									label: "Roles"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid grid-cols-6 gap-2",
					children: SEED_EMPLOYEES.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1 rounded-lg bg-primary-fg/8 px-1 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonAvatar, {
							firstName: person.firstName,
							lastName: person.lastName,
							size: "sm",
							className: "bg-primary-fg/20 text-primary-fg"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-[10px] text-primary-fg/80",
							children: person.firstName
						})]
					}, `${person.firstName}-${person.lastName}`))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center px-5 py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center gap-3 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffPulseMark, { className: "size-9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-semibold",
							children: "StaffPulse"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-mute",
						children: "Your directory stays private to this account."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-3",
						children: [
							GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								className: "w-full",
								onClick: () => signIn(provider.providerId, { callbackURL: "/" }),
								children: ["Continue with ", provider.label]
							}, provider.providerId)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 py-2 text-xs text-faint",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" }),
									"or email",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailAuthForm, {})
						]
					})
				]
			})
		})]
	});
}
function AuthLoadingScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-svh place-items-center bg-page px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffPulseMark, { className: "mx-auto size-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-display text-lg font-semibold text-ink",
				children: "StaffPulse"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-mute",
				children: "Opening the desk…"
			})
		] })
	});
}
function Stat({ n, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-md bg-primary-fg/10 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg font-semibold tabular-nums",
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-primary-fg/70",
			children: label
		})]
	});
}
function EmailAuthForm() {
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function onSubmit(event) {
		event.preventDefault();
		setBusy(true);
		setError(null);
		try {
			if (mode === "up") {
				const { error: signUpError } = await authClient.signUp.email({
					email,
					password,
					name: name.trim() || email.split("@")[0] || "Teammate"
				});
				if (signUpError) throw new Error(signUpError.message);
			}
			const { error: signInError } = await authClient.signIn.email({
				email,
				password
			});
			if (signInError) throw new Error(signInError.message);
			window.location.href = "/";
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not sign in.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-3",
		children: [
			mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1.5 block text-sm font-medium text-ink",
					children: "Name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					autoComplete: "name"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1.5 block text-sm font-medium text-ink",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					type: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					autoComplete: "email"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1.5 block text-sm font-medium text-ink",
					children: "Password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					type: "password",
					minLength: 8,
					value: password,
					onChange: (e) => setPassword(e.target.value),
					autoComplete: mode === "up" ? "new-password" : "current-password"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				disabled: busy,
				children: busy ? "Working…" : mode === "up" ? "Create account" : "Sign in with email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "w-full text-center text-sm text-mute hover:text-ink",
				onClick: () => {
					setMode(mode === "up" ? "in" : "up");
					setError(null);
				},
				children: mode === "up" ? "Already have an account? Sign in" : "New here? Create an account"
			})
		]
	});
}
//#endregion
export { PersonAvatar as a, cn as c, useCurrentUserState as d, LoginScreen as i, fullName as l, Button as n, StaffPulseMark as o, Input as r, buttonVariants as s, AuthLoadingScreen as t, useCurrentUser as u };
