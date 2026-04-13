import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import clsx from "clsx";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import DashboardPage from "./components/dashboard/DashboardPage";
import SpecPageRenderer from "./components/spec/SpecPageRenderer";
import { defaultRoute, moduleConfig } from "./data/specConfig";
import type { ModuleDefinition } from "./types/spec";
import LoginPage from "./components/auth/LoginPage";
import type { UserRole } from "./components/auth/LoginPage";

const STORAGE_KEY = "erp_user_role";

const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  hr: "HR",
  finance: "Finance",
  inventory: "Inventory"
};

const roleModuleAccess: Record<Exclude<UserRole, "admin">, string[]> = {
  hr: ["hr"],
  finance: ["finance"],
  inventory: ["inventory"]
};

const getModulesForRole = (role: UserRole): ModuleDefinition[] => {
  if (role === "admin") {
    return moduleConfig;
  }
  const allowedModules = roleModuleAccess[role];
  return moduleConfig.filter((module) => allowedModules.includes(module.id));
};

const getScreensForModules = (modules: ModuleDefinition[]) =>
  modules.flatMap((module) => module.submodules.flatMap((submodule) => submodule.screens));

const getDefaultPathForModules = (modules: ModuleDefinition[]) =>
  modules[0]?.submodules[0]?.screens[0]?.path ?? defaultRoute;

type DashboardLayoutProps = {
  role: UserRole;
  onLogout: () => void;
};

const DashboardLayout = ({ role, onLogout }: DashboardLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const visibleModules = useMemo(() => getModulesForRole(role), [role]);
  const accessibleScreens = useMemo(() => getScreensForModules(visibleModules), [visibleModules]);
  const roleHomePath = useMemo(() => getDefaultPathForModules(visibleModules), [visibleModules]);

  const activeScreen = useMemo(
    () => accessibleScreens.find((screen) => screen.path === location.pathname),
    [accessibleScreens, location.pathname]
  );

  return (
    <div className="min-h-screen bg-page">
      <Sidebar
        expanded={sidebarExpanded}
        mobileOpen={mobileSidebarOpen}
        modules={visibleModules}
        role={role}
        onToggleExpanded={() => setSidebarExpanded((value) => !value)}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div
        className={clsx(
          "min-h-screen transition-[padding-left] duration-300",
          sidebarExpanded ? "md:pl-[19rem]" : "md:pl-0"
        )}
      >
        <TopBar
          title={activeScreen?.title ?? "Dashboard"}
          roleLabel={roleLabels[role]}
          onMenuClick={() => setMobileSidebarOpen(true)}
          sidebarExpanded={sidebarExpanded}
          onToggleSidebar={() => setSidebarExpanded((value) => !value)}
          onLogout={onLogout}
        />

        <main className="px-4 pb-8 pt-4 md:px-6 md:pt-5">
          <Routes>
            <Route path="/" element={<Navigate to={roleHomePath} replace />} />
            <Route path="/login" element={<Navigate to={roleHomePath} replace />} />
            {accessibleScreens.map((screen) => (
              <Route
                key={screen.path}
                path={screen.path}
                element={screen.type === "dashboard" ? <DashboardPage /> : <SpecPageRenderer screen={screen} />}
              />
            ))}
            <Route path="*" element={<Navigate to={roleHomePath} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const getInitialRole = (): UserRole | null => {
  const savedRole = localStorage.getItem(STORAGE_KEY);
  if (savedRole === "admin" || savedRole === "hr" || savedRole === "finance" || savedRole === "inventory") {
    return savedRole;
  }
  return null;
};

const AppRouter = () => {
  const [activeRole, setActiveRole] = useState<UserRole | null>(getInitialRole);

  const handleLogin = (role: UserRole) => {
    localStorage.setItem(STORAGE_KEY, role);
    setActiveRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setActiveRole(null);
  };

  if (!activeRole) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return <DashboardLayout role={activeRole} onLogout={handleLogout} />;
};

const App = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);

export default App;
