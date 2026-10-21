import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Trophy,
  GraduationCap,
  Sparkles,
  X,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
}

export const navigationItems: NavItem[] = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { label: "Discover", path: "/discover", icon: Compass },
  { label: "My Learning", path: "/learning", icon: BookOpen, badge: "3" },
  { label: "My Progress", path: "/progress", icon: Trophy },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs transition-opacity md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        aria-label="Main Navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200/80 bg-white px-5 py-6 transition-transform duration-200 ease-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand header */}
        <div className="mb-8 flex items-center justify-between px-1">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-slate-900">
                Daily<span className="text-indigo-600">Skill</span>
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Microlearning
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Section title */}
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Navigation
        </p>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navigationItems.map(({ label, path, icon: Icon, badge }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              <span>{label}</span>
              {badge && (
                <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Motivation Card */}
        <div className="mt-auto pt-6">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-700 to-indigo-900 p-4 text-white shadow-sm">
            <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
              <Sparkles size={16} />
            </div>
            <p className="text-xs font-bold">5–15 Minutes a Day</p>
            <p className="mt-1 text-[11px] leading-relaxed text-indigo-100/90">
              Consistent daily practice builds durable mastery over time.
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[40%] rounded-full bg-white" />
            </div>
            <p className="mt-1.5 text-[10px] text-indigo-200">
              Today's goal: 1 lesson
            </p>
          </div>

          {/* User profile preview */}
          <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              DS
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-800">
                Demo Student
              </p>
              <p className="truncate text-[10px] text-slate-400">
                Software Engineering
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
