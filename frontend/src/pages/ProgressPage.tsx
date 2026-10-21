import React from "react";
import { Trophy, Flame, Target, Zap, CalendarCheck, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Badge } from "../components/ui/Badge";

export const ProgressPage: React.FC = () => {
  const weekDays = [
    { day: "Mon", status: "completed", date: "Oct 19" },
    { day: "Tue", status: "completed", date: "Oct 20" },
    { day: "Wed", status: "today", date: "Oct 21" },
    { day: "Thu", status: "upcoming", date: "Oct 22" },
    { day: "Fri", status: "upcoming", date: "Oct 23" },
    { day: "Sat", status: "upcoming", date: "Oct 24" },
    { day: "Sun", status: "upcoming", date: "Oct 25" },
  ];

  const domainMastery = [
    { domain: "Data Structures & Algorithms", mastery: 35, level: "Beginner", color: "indigo" as const },
    { domain: "Java Fundamentals", mastery: 20, level: "Beginner", color: "violet" as const },
    { domain: "Web Development", mastery: 10, level: "Introductory", color: "emerald" as const },
    { domain: "Cybersecurity & Systems", mastery: 5, level: "Introductory", color: "amber" as const },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-xs">
          <Trophy size={14} />
          <span>Progress & Analytics Dashboard</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Your Learning Momentum
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Visualize your habit consistency, domain mastery, and milestone achievements.
        </p>
      </div>

      {/* Highlights Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Current Streak</span>
            <div className="rounded-xl bg-orange-50 p-2 text-orange-600">
              <Flame size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-slate-900">2 Days</p>
          <p className="mt-1 text-[11px] text-slate-400">Longest: 5 Days (Demo)</p>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Mastered Concepts</span>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
              <Award size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-slate-900">6 Topics</p>
          <p className="mt-1 text-[11px] text-slate-400">Across 3 domains</p>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Assessment Accuracy</span>
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
              <Target size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-slate-900">88%</p>
          <p className="mt-1 text-[11px] text-slate-400">14 of 16 questions correct</p>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Cumulative Experience</span>
            <div className="rounded-xl bg-violet-50 p-2 text-violet-600">
              <Zap size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-slate-900">350 XP</p>
          <p className="mt-1 text-[11px] text-slate-400">Level 2 Apprentice</p>
        </Card>
      </section>

      {/* Weekly Habit Calendar & Consistency */}
      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="p-6">
          <CardHeader className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarCheck size={18} className="text-indigo-600" />
                <CardTitle className="text-sm">Weekly Learning Rhythm</CardTitle>
              </div>
              <Badge variant="neutral">This Week</Badge>
            </div>
            <CardDescription>
              Consistency is measured by completing at least one 5–15 minute lesson daily.
            </CardDescription>
          </CardHeader>

          <div className="grid grid-cols-7 gap-2 pt-2 text-center">
            {weekDays.map((item) => (
              <div
                key={item.day}
                className={`flex flex-col items-center rounded-xl p-2.5 transition-all ${
                  item.status === "completed"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    : item.status === "today"
                    ? "bg-indigo-50 border-2 border-indigo-600 text-indigo-800"
                    : "bg-slate-50 border border-slate-100 text-slate-400"
                }`}
              >
                <span className="text-[10px] font-bold uppercase">{item.day}</span>
                <div className="my-1.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold">
                  {item.status === "completed" ? (
                    <Award size={16} className="text-emerald-600" />
                  ) : item.status === "today" ? (
                    <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                  ) : (
                    <span className="text-slate-300">•</span>
                  )}
                </div>
                <span className="text-[9px] font-medium">{item.date}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 border border-slate-100">
            <strong>Habit Rule:</strong> Missing one day won't reset your journey if you resume within 24 hours. Spaced repetition scheduling activates in Phase 6.
          </div>
        </Card>

        {/* Domain Mastery Breakdown */}
        <Card className="p-6">
          <CardHeader className="mb-4">
            <CardTitle className="text-sm">Knowledge Domain Mastery</CardTitle>
            <CardDescription>
              Estimated mastery calculated from lesson completions and assessment scores.
            </CardDescription>
          </CardHeader>

          <div className="space-y-4">
            {domainMastery.map((item) => (
              <div key={item.domain} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.domain}</span>
                  <span className="text-slate-400 font-medium">{item.level}</span>
                </div>
                <ProgressBar
                  value={item.mastery}
                  showValueLabel
                  color={item.color}
                  size="md"
                />
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[10px] text-slate-400 italic">
            Visual demo mockup · Backend mastery calculation engine will be established in Phase 5.
          </p>
        </Card>
      </section>
    </div>
  );
};
