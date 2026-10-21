import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, navigationItems } from "./Sidebar";
import { AppHeader } from "./AppHeader";

export const AppLayout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const currentNav = navigationItems.find(
    (item) => item.path === location.pathname || (item.path !== "/" && location.pathname.startsWith(item.path))
  );

  const pageTitle = currentNav?.label ?? "DailySkill Workspace";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-h-screen flex-col md:pl-64">
        <AppHeader pageTitle={pageTitle} onOpenMenu={() => setMenuOpen(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>

        <footer className="border-t border-slate-200/60 bg-white/50 px-6 py-4 text-center text-xs text-slate-400">
          DailySkill · Master software engineering through deliberate 5–15 minute daily practice.
        </footer>
      </div>
    </div>
  );
};
