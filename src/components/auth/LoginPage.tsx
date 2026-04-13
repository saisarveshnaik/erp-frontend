import { useMemo, useState } from "react";
import clsx from "clsx";
import { Boxes, BriefcaseBusiness, Lock, Mail, ShieldCheck, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type UserRole = "admin" | "hr" | "finance" | "inventory";

type LoginPageProps = {
  onLogin: (role: UserRole) => void;
};

const roleTabs: Array<{ id: UserRole; label: string; description: string; icon: LucideIcon }> = [
  { id: "admin", label: "Admin", description: "Full dashboard access", icon: ShieldCheck },
  { id: "hr", label: "HR", description: "HR module only", icon: BriefcaseBusiness },
  { id: "finance", label: "Finance", description: "Finance module only", icon: Wallet },
  { id: "inventory", label: "Inventory", description: "Inventory module only", icon: Boxes }
];

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const activeRole = useMemo(
    () => roleTabs.find((tab) => tab.id === selectedRole) ?? roleTabs[0],
    [selectedRole]
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-page px-4 py-8 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(124,58,237,0.13),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.12),transparent_32%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-white shadow-soft lg:grid-cols-[1.1fr_1fr]">
          <section className="relative hidden min-h-full overflow-hidden bg-slate-900 p-8 text-white lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.2),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(129,140,248,0.35),transparent_30%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  ERP FRONTEND
                </span>
                <h1 className="mt-6 max-w-sm text-3xl font-extrabold leading-tight">
                  Secure role-based access for your ERP workspace.
                </h1>
                <p className="mt-3 max-w-sm text-sm text-slate-200">
                  Choose your role and continue to the module assigned to your account.
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">Active Role</p>
                <p className="mt-2 text-xl font-bold">{activeRole.label}</p>
                <p className="mt-1 text-sm text-slate-100">{activeRole.description}</p>
              </div>
            </div>
          </section>

          <section className="p-5 sm:p-7 md:p-8">
            <div className="mx-auto w-full max-w-md">
              <h2 className="text-2xl font-extrabold text-slate-900">Sign in</h2>
              <p className="mt-1 text-sm text-slate-500">Select a role and enter your credentials.</p>

              <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-page p-2">
                {roleTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedRole(tab.id)}
                    className={clsx(
                      "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition",
                      selectedRole === tab.id
                        ? "bg-brand-600 text-white shadow-soft"
                        : "text-slate-600 hover:bg-white hover:text-brand-700"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <form
                className="mt-6 space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  onLogin(selectedRole);
                }}
              >
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-slate-700">Email</span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={`${selectedRole}@erp.local`}
                      className="h-11 w-full rounded-xl border border-border bg-page pl-10 pr-3 text-sm text-slate-700 outline-none ring-brand-200 placeholder:text-slate-400 focus:border-brand-200 focus:bg-white focus:ring"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-slate-700">Password</span>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      className="h-11 w-full rounded-xl border border-border bg-page pl-10 pr-3 text-sm text-slate-700 outline-none ring-brand-200 placeholder:text-slate-400 focus:border-brand-200 focus:bg-white focus:ring"
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Continue as {activeRole.label}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
