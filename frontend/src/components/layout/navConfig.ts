import React from "react";
import { LayoutDashboard, Compass, BookOpen, Trophy } from "lucide-react";

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
