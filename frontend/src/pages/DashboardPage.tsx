import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  BookOpen,
  Target,
  Zap,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Code2,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { DEMO_FEATURED_LESSON, DEMO_LESSONS } from "../data/mockLessons";

export const DashboardPage: React.FC = () => {
  const [isDemoCompleted, setIsDemoCompleted] = useState(false);

  return (
    <div className="space-y-8">
      {/* Welcome & Daily Context */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-xs">
            <Sparkles size={14} />
            <span>Today's Learning Space</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Deliberate Practice, <span className="text-indigo-600">Daily.</span>
          </h2>
          <p className="mt-1.5 max-w-xl text-xs sm:text-sm text-slate-500 leading-relaxed">
            Spend 5–15 minutes on a focused concept today. Small, consistent efforts compound into deep mastery.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white border border-slate-200/70 px-3 py-2 rounded-xl">
          <Calendar size={15} className="text-slate-400" />
          <span>Daily Plan · 1 Lesson Target</span>
        </div>
      </section>

      {/* Featured Today's Micro-Lesson Card */}
      <section aria-labelledby="featured-lesson-heading">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-900 p-6 text-white shadow-lg shadow-indigo-950/10 sm:p-8">
          {/* Subtle background decoration */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-16 right-1/3 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl" />

          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-200">
                <Zap size={13} className="text-amber-300" />
                Featured Daily Lesson
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-2">
                <span>{DEMO_FEATURED_LESSON.domain}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {DEMO_FEATURED_LESSON.durationMinutes} mins
                </span>
                <span>•</span>
                <span className="text-emerald-300">{DEMO_FEATURED_LESSON.level}</span>
              </div>

              <h3 id="featured-lesson-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
                {DEMO_FEATURED_LESSON.title}
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
                {DEMO_FEATURED_LESSON.description}
              </p>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-indigo-100">
                <span className="font-bold text-white">Core Takeaway: </span>
                {DEMO_FEATURED_LESSON.keyTakeaway}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  className="bg-white text-indigo-900 hover:bg-indigo-50 hover:text-indigo-950 shadow-md font-bold"
                  onClick={() => setIsDemoCompleted((prev) => !prev)}
                  leftIcon={isDemoCompleted ? <CheckCircle2 size={16} className="text-emerald-600" /> : undefined}
                  rightIcon={!isDemoCompleted ? <ArrowRight size={16} /> : undefined}
                >
                  {isDemoCompleted ? "Completed (Demo Toggle)" : "Start Daily Lesson"}
                </Button>

                {isDemoCompleted && (
                  <span className="text-[11px] text-indigo-200 italic">
                    UI Demo: Persistent database storage connects in Phase 3.
                  </span>
                )}
              </div>
            </div>

            <div className="hidden h-36 w-36 items-center justify-center rounded-2xl border border-white/15 bg-white/5 md:flex">
              <Code2 size={56} strokeWidth={1.4} className="text-indigo-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid gap-4 grid-cols-2 lg:grid-cols-4" aria-label="Learning Metrics">
        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Learning Streak</span>
            <div className="rounded-xl bg-orange-50 p-2 text-orange-600">
              <Flame size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-slate-900">0 Days</p>
          <p className="mt-1 text-[11px] text-slate-400">Complete today's lesson to start</p>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Lessons Completed</span>
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
              <BookOpen size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-slate-900">{isDemoCompleted ? "1" : "0"}</p>
          <p className="mt-1 text-[11px] text-slate-400">Target: 7 this week</p>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Quiz Accuracy</span>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
              <Target size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-slate-900">—</p>
          <p className="mt-1 text-[11px] text-slate-400">Phase 4 interactive assessments</p>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Learning Points</span>
            <div className="rounded-xl bg-violet-50 p-2 text-violet-600">
              <Zap size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-slate-900">{isDemoCompleted ? "50 XP" : "0 XP"}</p>
          <p className="mt-1 text-[11px] text-slate-400">+50 XP per lesson</p>
        </Card>
      </section>

      {/* Main Content Grid: Recent Lessons + Habit Corner */}
      <section className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Recommended Lessons Queue */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Up Next in Your Curriculum</h3>
              <p className="text-xs text-slate-500">Curated micro-lessons aligned with your goals</p>
            </div>
            <Link
              to="/discover"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              View catalog <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {DEMO_LESSONS.slice(1, 4).map((lesson) => (
              <Card key={lesson.id} hoverEffect className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" size="sm">
                        {lesson.domain}
                      </Badge>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {lesson.durationMinutes}m
                      </span>
                      <span className="text-[11px] text-slate-400">• {lesson.level}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-800">{lesson.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{lesson.description}</p>
                  </div>

                  <Link to="/discover">
                    <Button variant="outline" size="sm" rightIcon={<ChevronRight size={14} />}>
                      Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-5">
          {/* Daily Goal Card */}
          <Card>
            <CardHeader className="mb-3">
              <CardTitle className="text-sm">Daily Habit Target</CardTitle>
              <CardDescription>Consistency over intensity</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressBar
                value={isDemoCompleted ? 100 : 0}
                label="Today's Lesson"
                showValueLabel
                color="emerald"
                size="md"
              />
              <p className="text-[11px] text-slate-500 mt-2">
                {isDemoCompleted
                  ? "Great job! You met your minimum daily practice target."
                  : "Complete 1 lesson today to keep your progress active."}
              </p>
            </CardContent>
          </Card>

          {/* Educational Thought of the Day */}
          <div className="rounded-2xl border border-amber-200/70 bg-amber-50/60 p-4">
            <div className="flex items-center gap-2 text-amber-800">
              <Lightbulb size={18} className="text-amber-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Engineering Principle</h4>
            </div>
            <p className="mt-2 text-xs text-amber-950/80 leading-relaxed font-medium">
              "Premature optimization is the root of all evil. Focus on algorithmic correctness, clarity, and bounded complexity first."
            </p>
            <span className="mt-2 block text-[10px] font-semibold text-amber-700">— Donald Knuth</span>
          </div>
        </div>
      </section>
    </div>
  );
};
