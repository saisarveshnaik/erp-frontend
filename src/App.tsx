import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import clsx from "clsx";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import DashboardPage from "./components/dashboard/DashboardPage";
import SpecPageRenderer from "./components/spec/SpecPageRenderer";
import { allScreens, defaultRoute, getScreenByPath } from "./data/specConfig";

const AppLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const activeScreen = useMemo(() => getScreenByPath(location.pathname), [location.pathname]);

  return (
    <div className="min-h-screen bg-page">
      <Sidebar
        expanded={sidebarExpanded}
        mobileOpen={mobileSidebarOpen}
        onToggleExpanded={() => setSidebarExpanded((value) => !value)}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className={clsx("min-h-screen transition-[padding] duration-300 md:pl-[19rem]", !sidebarExpanded && "md:pl-20")}>
        <TopBar title={activeScreen?.title ?? "Dashboard"} onMenuClick={() => setMobileSidebarOpen(true)} />

        <main className="px-4 pb-8 pt-4 md:px-6 md:pt-5">
          <Routes>
            <Route path="/" element={<Navigate to={defaultRoute} replace />} />
            {allScreens.map((screen) => (
              <Route
                key={screen.path}
                path={screen.path}
                element={screen.type === "dashboard" ? <DashboardPage /> : <SpecPageRenderer screen={screen} />}
              />
            ))}
            <Route path="*" element={<Navigate to={defaultRoute} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default App;
