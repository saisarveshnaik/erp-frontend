import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  CirclePlus,
  Eye,
  FileText,
  House,
  LayoutGrid,
  List,
  Package,
  Pencil,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Shield,
  Users,
  Wallet
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { moduleConfig } from "../../data/specConfig";
import type { ScreenType } from "../../types/spec";

const moduleIcons = {
  dashboard: House,
  hr: Users,
  finance: Wallet,
  inventory: Package,
  reports: BarChart3,
  users: Shield,
  settings: Settings
};

const submoduleIcons: Record<string, LucideIcon> = {
  overview: House,
  employees: Users,
  departments: LayoutGrid,
  designations: List,
  attendance: CalendarDays,
  "leave-types": CalendarDays,
  "leave-request": CalendarDays,
  documents: FileText,
  assets: Package,
  shifts: CalendarDays,
  holidays: CalendarDays,
  payroll: Wallet,
  invoices: FileText,
  expenses: Wallet,
  payments: Wallet,
  accounts: Wallet,
  transactions: List,
  vendors: Users,
  customers: Users,
  products: Package,
  suppliers: Package,
  categories: LayoutGrid,
  "purchase-orders": FileText,
  stock: Package,
  warehouses: Package,
  "reports-hub": BarChart3,
  "users-model": Users,
  "roles-model": Shield,
  "permissions-model": LayoutGrid,
  company: House,
  currency: Wallet,
  "email-config": FileText,
  "tax-config": FileText,
  "system-preferences": Settings
};

const screenTypeIcons: Record<ScreenType, LucideIcon> = {
  dashboard: House,
  list: List,
  create: CirclePlus,
  edit: Pencil,
  view: Eye,
  report: FileText,
  matrix: LayoutGrid,
  calendar: CalendarDays
};

type SidebarProps = {
  expanded: boolean;
  mobileOpen: boolean;
  onToggleExpanded: () => void;
  onCloseMobile: () => void;
};

const getFirstModulePath = (moduleId: string) =>
  moduleConfig.find((module) => module.id === moduleId)?.submodules[0]?.screens[0]?.path ?? "/dashboard";

const Sidebar = ({ expanded, mobileOpen, onToggleExpanded, onCloseMobile }: SidebarProps) => {
  const location = useLocation();
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);
  const [openSubmoduleKey, setOpenSubmoduleKey] = useState<string | null>(null);

  const activeModuleId = useMemo(
    () =>
      moduleConfig.find((module) =>
        module.submodules.some((submodule) => submodule.screens.some((screen) => screen.path === location.pathname))
      )?.id ?? null,
    [location.pathname]
  );

  const activeSubmoduleKey = useMemo(() => {
    for (const module of moduleConfig) {
      const matchedSubmodule = module.submodules.find((submodule) =>
        submodule.screens.some((screen) => screen.path === location.pathname)
      );
      if (matchedSubmodule) {
        return `${module.id}:${matchedSubmodule.id}`;
      }
    }
    return null;
  }, [location.pathname]);

  useEffect(() => {
    setOpenModuleId(activeModuleId);
  }, [activeModuleId]);

  useEffect(() => {
    setOpenSubmoduleKey(activeSubmoduleKey);
  }, [activeSubmoduleKey]);

  const toggleModule = (moduleId: string) => {
    setOpenModuleId((current) => {
      if (current === moduleId) {
        setOpenSubmoduleKey(null);
        return null;
      }

      if (activeSubmoduleKey?.startsWith(`${moduleId}:`)) {
        setOpenSubmoduleKey(activeSubmoduleKey);
      } else {
        setOpenSubmoduleKey(null);
      }
      return moduleId;
    });
  };

  const toggleSubmodule = (moduleId: string, submoduleId: string) => {
    const submoduleKey = `${moduleId}:${submoduleId}`;
    setOpenSubmoduleKey((current) => (current === submoduleKey ? null : submoduleKey));
  };

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-30 bg-slate-900/40 transition-opacity md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex h-screen w-[19rem] flex-col overflow-hidden border-r border-border bg-white transition-all duration-300",
          "-translate-x-full md:translate-x-0",
          mobileOpen && "translate-x-0",
          !expanded && "md:w-0 md:border-r-0"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <div className={clsx("flex items-center gap-3", !expanded && "w-full justify-center")}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
              <House className="h-[18px] w-[18px]" />
            </div>
            {expanded && (
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold tracking-wide text-slate-900">ERP FRONTEND</p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleExpanded}
            className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-brand-50 hover:text-brand-600 md:inline-flex"
            aria-label="Toggle sidebar"
          >
            {expanded ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-brand-50 hover:text-brand-600 md:hidden"
            aria-label="Close sidebar"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {!expanded && (
            <div className="space-y-3 px-2">
              <button
                type="button"
                className="flex w-full justify-center rounded-xl bg-brand-600 px-3 py-2 text-white transition hover:bg-brand-700"
                aria-label="Quick action"
              >
                <CirclePlus className="h-4 w-4" />
              </button>

              <ul className="space-y-2">
                {moduleConfig.map((module) => {
                  const Icon = moduleIcons[module.id as keyof typeof moduleIcons] ?? House;
                  const firstPath = module.submodules[0]?.screens[0]?.path ?? "/dashboard";
                  const isModuleActive = activeModuleId === module.id;
                  return (
                    <li key={module.id}>
                      <NavLink
                        to={firstPath}
                        title={module.title}
                        onClick={onCloseMobile}
                        className={() =>
                          clsx(
                            "flex justify-center rounded-xl p-2.5 text-slate-600 transition hover:bg-brand-50 hover:text-brand-700",
                            isModuleActive && "bg-brand-600 text-white shadow-soft hover:bg-brand-600 hover:text-white"
                          )
                        }
                      >
                        <Icon className="h-5 w-5" />
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {expanded && (
            <div className="space-y-4 px-3">
              <section className="rounded-2xl border border-border bg-page/80 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-sm font-bold text-brand-700">
                    EF
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800">ERP Admin</p>
                    <p className="truncate text-xs text-slate-500">System Administrator</p>
                  </div>
                </div>
              </section>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                <CirclePlus className="h-4 w-4" />
                <span>Quick Action</span>
              </button>

              <div className="space-y-3 pb-4">
                {moduleConfig.map((module) => {
                  const ModuleIcon = moduleIcons[module.id as keyof typeof moduleIcons] ?? House;
                  if (module.id === "dashboard") {
                    const dashboardPath = getFirstModulePath(module.id);
                    return (
                      <section key={module.id}>
                        <NavLink
                          to={dashboardPath}
                          onClick={onCloseMobile}
                          className={({ isActive }) =>
                            clsx(
                              "group mb-2 flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition",
                              isActive
                                ? "border-brand-200 bg-brand-50 text-brand-700 shadow-soft"
                                : "border-transparent bg-slate-50/70 text-slate-700 hover:border-brand-100 hover:bg-white"
                            )
                          }
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-500 transition group-hover:text-brand-600">
                            <ModuleIcon className="h-4 w-4" />
                          </span>
                          <span className="text-xs font-bold uppercase tracking-[0.12em]">{module.title}</span>
                        </NavLink>
                      </section>
                    );
                  }

                  return (
                  <section key={module.id}>
                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className={clsx(
                        "group mb-2 flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition",
                        openModuleId === module.id
                          ? "border-brand-200 bg-brand-50 text-brand-700 shadow-soft"
                          : "border-transparent bg-slate-50/70 text-slate-700 hover:border-brand-100 hover:bg-white"
                      )}
                    >
                      <span
                        className={clsx(
                          "flex h-7 w-7 items-center justify-center rounded-lg transition",
                          openModuleId === module.id
                            ? "bg-brand-600 text-white"
                            : "bg-white text-slate-500 group-hover:text-brand-600"
                        )}
                      >
                        <ModuleIcon className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.12em]">{module.title}</span>
                      <ChevronRight
                        className={clsx(
                          "ml-auto h-4 w-4 text-slate-700 transition",
                          openModuleId === module.id && "rotate-90 text-brand-600"
                        )}
                      />
                    </button>

                    {openModuleId === module.id && (
                      <ul className="space-y-1 rounded-xl bg-page/70 p-1.5">
                        {module.submodules.map((submodule) => {
                          const SubmoduleIcon = submoduleIcons[submodule.id] ?? FileText;
                          const submoduleKey = `${module.id}:${submodule.id}`;
                          const isOpen = openSubmoduleKey === submoduleKey;
                          const isActiveSubmodule = activeSubmoduleKey === submoduleKey;
                          const submoduleFirstPath = submodule.screens[0]?.path ?? getFirstModulePath(module.id);
                          const isEmployeeQuickAccess = module.id === "hr" && submodule.id === "employees";
                          const isDepartmentQuickAccess = module.id === "hr" && submodule.id === "departments";
                          const isDesignationQuickAccess = module.id === "hr" && submodule.id === "designations";
                          const isAttendanceQuickAccess = module.id === "hr" && submodule.id === "attendance";
                          const isLeaveTypeQuickAccess = module.id === "hr" && submodule.id === "leave-types";
                          const isLeaveRequestQuickAccess = module.id === "hr" && submodule.id === "leave-request";
                          const isDocumentQuickAccess = module.id === "hr" && submodule.id === "documents";
                          const isAssetQuickAccess = module.id === "hr" && submodule.id === "assets";
                          const isShiftQuickAccess = module.id === "hr" && submodule.id === "shifts";
                          const isHolidayQuickAccess = module.id === "hr" && submodule.id === "holidays";
                          const isPayrollQuickAccess = module.id === "hr" && submodule.id === "payroll";
                          const isInvoiceQuickAccess = module.id === "finance" && submodule.id === "invoices";
                          const isExpenseQuickAccess = module.id === "finance" && submodule.id === "expenses";
                          const isPaymentQuickAccess = module.id === "finance" && submodule.id === "payments";
                          const isAccountQuickAccess = module.id === "finance" && submodule.id === "accounts";
                          const isTransactionQuickAccess = module.id === "finance" && submodule.id === "transactions";
                          const isVendorQuickAccess = module.id === "finance" && submodule.id === "vendors";
                          const isCustomerQuickAccess = module.id === "finance" && submodule.id === "customers";
                          const hasDropdown =
                            !(
                              isEmployeeQuickAccess ||
                              isDepartmentQuickAccess ||
                              isDesignationQuickAccess ||
                              isAttendanceQuickAccess ||
                              isLeaveTypeQuickAccess ||
                              isLeaveRequestQuickAccess ||
                              isDocumentQuickAccess ||
                              isAssetQuickAccess ||
                              isShiftQuickAccess ||
                              isHolidayQuickAccess ||
                              isPayrollQuickAccess ||
                              isInvoiceQuickAccess ||
                              isExpenseQuickAccess ||
                              isPaymentQuickAccess ||
                              isAccountQuickAccess ||
                              isTransactionQuickAccess ||
                              isVendorQuickAccess ||
                              isCustomerQuickAccess
                            ) &&
                            (submodule.screens.length > 1 || module.id !== "dashboard");

                          if (!hasDropdown) {
                            return (
                              <li key={submodule.id}>
                                <NavLink
                                  to={submoduleFirstPath}
                                  onClick={onCloseMobile}
                                  className={({ isActive }) =>
                                    clsx(
                                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700",
                                      isActive && "bg-brand-50 text-brand-700"
                                    )
                                  }
                                >
                                  <SubmoduleIcon className="h-[18px] w-[18px] text-slate-500" />
                                  <span className="flex-1">{submodule.screens[0]?.title ?? submodule.title}</span>
                                </NavLink>
                              </li>
                            );
                          }

                          return (
                            <li
                              key={submodule.id}
                              className={clsx(
                                "rounded-xl border border-transparent bg-transparent",
                                (isOpen || isActiveSubmodule) && "border-brand-100 bg-brand-50/40"
                              )}
                            >
                              <button
                                type="button"
                                onClick={() => toggleSubmodule(module.id, submodule.id)}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                              >
                                <SubmoduleIcon className="h-[18px] w-[18px] text-slate-500" />
                                <span className="flex-1 text-left">{submodule.title}</span>
                                <ChevronRight
                                  className={clsx(
                                    "h-4 w-4 text-slate-700 transition",
                                    isOpen && "rotate-90 text-brand-600"
                                  )}
                                />
                              </button>

                              {isOpen && (
                                <div className="ml-9 space-y-2 border-l border-brand-100 pb-3 pl-3 pr-3">
                                  <ul className="space-y-1">
                                    {submodule.screens.map((screen) => {
                                      const ScreenIcon = screenTypeIcons[screen.type] ?? FileText;
                                      return (
                                        <li key={screen.id}>
                                          <NavLink
                                            to={screen.path}
                                            onClick={onCloseMobile}
                                            className={({ isActive }) =>
                                              clsx(
                                                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700",
                                                isActive && "bg-brand-100/60 text-brand-700"
                                              )
                                            }
                                          >
                                            <ScreenIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                            <span>{screen.title}</span>
                                          </NavLink>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </section>
                );
                })}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
