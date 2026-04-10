import { useEffect, useRef, useState } from "react";
import { Bell, PanelLeftOpen, Search, UserCircle2 } from "lucide-react";

type TopBarProps = {
  onMenuClick: () => void;
  onToggleSidebar: () => void;
  sidebarExpanded: boolean;
  title: string;
};

const notifications = [
  { id: "notif-1", title: "Leave request submitted", time: "2 min ago" },
  { id: "notif-2", title: "Invoice INV-2302 pending review", time: "15 min ago" },
  { id: "notif-3", title: "Attendance sync completed", time: "1 hour ago" },
  { id: "notif-4", title: "New employee profile added", time: "Today" }
];

const TopBar = ({ onMenuClick, onToggleSidebar, sidebarExpanded, title }: TopBarProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    if (notificationsOpen || profileOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [notificationsOpen, profileOpen]);

  return (
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
          <div className="relative" ref={notificationsRef}>
            <button
              className="icon-btn relative"
              type="button"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              onClick={() => {
                setProfileOpen(false);
                setNotificationsOpen((open) => !open);
              }}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-600" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-12 z-40 w-[20rem] rounded-xl border border-border bg-white p-2 shadow-soft">
                <div className="px-2 py-1">
                  <p className="text-sm font-bold text-slate-800">Notifications</p>
                </div>
                <ul className="max-h-72 space-y-1 overflow-y-auto py-1">
                  {notifications.map((notification) => (
                    <li key={notification.id}>
                      <button
                        type="button"
                        className="w-full rounded-lg px-2 py-2 text-left transition hover:bg-brand-50"
                      >
                        <p className="text-sm font-semibold text-slate-700">{notification.title}</p>
                        <p className="text-xs text-slate-500">{notification.time}</p>
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-1 w-full rounded-lg border border-border bg-page px-3 py-2 text-sm font-semibold text-brand-700 transition hover:border-brand-200 hover:bg-brand-50"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-600"
              type="button"
              aria-label="Profile menu"
              aria-expanded={profileOpen}
              onClick={() => {
                setNotificationsOpen(false);
                setProfileOpen((open) => !open);
              }}
            >
              <UserCircle2 className="h-5 w-5 text-brand-600" />
              <span className="hidden sm:inline">Profile</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 z-40 w-56 rounded-xl border border-border bg-white p-2 shadow-soft">
                <div className="space-y-1">
                  <button type="button" className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-brand-50">
                    View Profile
                  </button>
                  <button type="button" className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-brand-50">
                    Account Settings
                  </button>
                  <button type="button" className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-brand-50">
                    Help
                  </button>
                </div>
                <button
                  type="button"
                  className="mt-2 w-full rounded-lg border border-danger/30 bg-red-50 px-3 py-2 text-left text-sm font-semibold text-danger transition hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
