import React from "react";
import { Menu, Flame, Bell } from "lucide-react";

interface AppHeaderProps {
  pageTitle: string;
  onOpenMenu: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ pageTitle, onOpenMenu }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation menu"
          className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          onClick={onOpenMenu}
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-base font-bold text-slate-900">{pageTitle}</h1>
          <p className="hidden text-xs text-slate-400 sm:block">
            Personalized Daily Microlearning
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Streak indicator */}
        <div
          title="Daily learning streak: Complete a lesson today to keep your streak going"
          className="flex items-center gap-1.5 rounded-full border border-orange-200/80 bg-orange-50/70 px-3 py-1 text-xs font-bold text-orange-700"
        >
          <Flame size={15} className="text-orange-500 fill-orange-500" />
          <span>0 Day Streak</span>
        </div>

        {/* Notifications demo trigger */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          onClick={() => window.alert("Notifications will be enabled in Phase 2 with authentication.")}
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600" />
        </button>

        {/* User avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-xs">
          DS
        </div>
      </div>
    </header>
  );
};
