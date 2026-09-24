import { useState, type FormEvent } from "react";
import { StaffPulseMark } from "@/components/mark";
import { PersonAvatar } from "@/components/person-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { SEED_EMPLOYEES } from "@/lib/staff/seed";

export function LoginScreen() {
  return (
    <main className="grid min-h-svh bg-page lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden bg-primary px-10 py-12 text-primary-fg lg:flex lg:flex-col">
        <div className="flex items-center gap-3">
          <StaffPulseMark className="size-10 brightness-0 invert" />
          <span className="font-display text-xl font-semibold">StaffPulse</span>
        </div>
        <div className="mt-auto max-w-md">
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            The people desk for teams that actually know each other.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-primary-fg/80">
            Directory, access roles, and a quiet pulse on who is in, out, or heading for the door.
          </p>
          <ul className="mt-8 grid grid-cols-3 gap-3 text-sm">
            <Stat n="12" label="People" />
            <Stat n="6" label="Desks" />
            <Stat n="3" label="Roles" />
          </ul>
        </div>
        <div className="mt-12 grid grid-cols-6 gap-2">
          {SEED_EMPLOYEES.map((person) => (
            <div
              key={`${person.firstName}-${person.lastName}`}
              className="flex flex-col items-center gap-1 rounded-lg bg-primary-fg/8 px-1 py-2"
            >
              <PersonAvatar
                firstName={person.firstName}
                lastName={person.lastName}
                size="sm"
                className="bg-primary-fg/20 text-primary-fg"
              />
              <span className="truncate text-[10px] text-primary-fg/80">{person.firstName}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <StaffPulseMark className="size-9" />
            <span className="font-display text-lg font-semibold">StaffPulse</span>
          </div>
          <h2 className="font-display text-2xl font-semibold">Sign in</h2>
          <p className="mt-1 text-sm text-mute">Your directory stays private to this account.</p>

          {authEnabled ? (
            <div className="mt-6 space-y-3">
              {GROK_PROVIDERS.map((provider) => (
                <Button
                  key={provider.providerId}
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn(provider.providerId, { callbackURL: "/" })}
                >
                  Continue with {provider.label}
                </Button>
              ))}
              <div className="flex items-center gap-3 py-2 text-xs text-faint">
                <span className="h-px flex-1 bg-line" />
                or email
                <span className="h-px flex-1 bg-line" />
              </div>
              <EmailAuthForm />
            </div>
          ) : (
            <p className="mt-6 text-sm text-mute">Sign-in is disabled.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export function AuthLoadingScreen() {
  return (
    <div className="grid min-h-svh place-items-center bg-page px-6 text-center">
      <div>
        <StaffPulseMark className="mx-auto size-10" />
        <p className="mt-4 font-display text-lg font-semibold text-ink">StaffPulse</p>
        <p className="mt-1 text-sm text-mute">Opening the desk…</p>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <li className="rounded-md bg-primary-fg/10 px-3 py-2">
      <p className="font-display text-lg font-semibold tabular-nums">{n}</p>
      <p className="text-xs text-primary-fg/70">{label}</p>
    </li>
  );
}

function EmailAuthForm() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const { error: signUpError } = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split("@")[0] || "Teammate",
        });
        if (signUpError) throw new Error(signUpError.message);
      }
      const { error: signInError } = await authClient.signIn.email({ email, password });
      if (signInError) throw new Error(signInError.message);
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {mode === "up" ? (
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Name</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
      ) : null}
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
          <Input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Password</span>
          <Input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "up" ? "new-password" : "current-password"}
          />
        </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Working…" : mode === "up" ? "Create account" : "Sign in with email"}
      </Button>
      <button
        type="button"
        className="w-full text-center text-sm text-mute hover:text-ink"
        onClick={() => {
          setMode(mode === "up" ? "in" : "up");
          setError(null);
        }}
      >
        {mode === "up" ? "Already have an account? Sign in" : "New here? Create an account"}
      </button>
    </form>
  );
}
