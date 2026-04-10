import { Bell, PanelLeftOpen, Search, UserCircle2 } from "lucide-react";

type TopBarProps = {
  onMenuClick: () => void;
  onToggleSidebar: () => void;
  sidebarExpanded: boolean;
  title: string;
};

const TopBar = ({ onMenuClick, onToggleSidebar, sidebarExpanded, title }: TopBarProps) => (
  <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
    <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="icon-btn md:hidden"
          aria-label="Open sidebar"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        {!sidebarExpanded && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden icon-btn md:inline-flex"
            aria-label="Expand sidebar"
          >
            <PanelLeftOpen className="h-5 w-5" />
          </button>
        )}
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      </div>

      <div className="hidden flex-1 items-center justify-center lg:flex">
        <label className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="h-10 w-full rounded-xl border border-border bg-page pl-9 pr-4 text-sm text-slate-700 outline-none ring-brand-200 placeholder:text-slate-400 focus:ring"
            placeholder="Global search"
            type="search"
          />
        </label>
      </div>

      <div className="flex items-center gap-2">
        <button className="icon-btn" type="button" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-600" type="button">
          <UserCircle2 className="h-5 w-5 text-brand-600" />
          <span className="hidden sm:inline">Profile</span>
        </button>
      </div>
    </div>
  </header>
);

export default TopBar;
