import React, { useState, useMemo } from "react";
import { Search, Clock, BookOpen, Check, SlidersHorizontal } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { DEMO_LESSONS } from "../data/mockLessons";
import type { LearningDomain, SkillLevel } from "../types/lesson";

export const DiscoverPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<LearningDomain | "All">("All");
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | "All">("All");

  const domains: (LearningDomain | "All")[] = [
    "All",
    "Data Structures & Algorithms",
    "Java Fundamentals",
    "Web Development",
    "Cybersecurity & Systems",
  ];

  const levels: (SkillLevel | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredLessons = useMemo(() => {
    return DEMO_LESSONS.filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDomain = selectedDomain === "All" || lesson.domain === selectedDomain;
      const matchesLevel = selectedLevel === "All" || lesson.level === selectedLevel;

      return matchesSearch && matchesDomain && matchesLevel;
    });
  }, [searchQuery, selectedDomain, selectedLevel]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDomain("All");
    setSelectedLevel("All");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Discover Lessons & Concepts
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Browse focused 5–15 minute daily micro-lessons across computer science and engineering disciplines.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            type="text"
            placeholder="Search by topic, keyword, or concept (e.g. Big O, memory, SQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
          />
        </div>

        {/* Filter Chips */}
        <div className="space-y-3 pt-1 border-t border-slate-100">
          {/* Domain Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <SlidersHorizontal size={12} /> Domain:
            </span>
            {domains.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => setSelectedDomain(domain)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  selectedDomain === domain
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Level Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Difficulty:
            </span>
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedLevel(level)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  selectedLevel === level
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Disclaimer */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredLessons.length}</strong> lesson
          {filteredLessons.length === 1 ? "" : "s"}
        </span>
        <span className="text-[11px] text-slate-400 italic">
          Demo catalog · Curriculum connects to dynamic backend in Phase 3
        </span>
      </div>

      {/* Lesson Grid */}
      {filteredLessons.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} hoverEffect className="flex flex-col justify-between p-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">
                    {lesson.domain}
                  </Badge>
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> {lesson.durationMinutes}m
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600">
                    {lesson.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                {lesson.prerequisites.length > 0 && (
                  <div className="rounded-lg bg-slate-50 p-2 text-[11px] text-slate-600 border border-slate-100">
                    <span className="font-semibold text-slate-700">Prereq: </span>
                    {lesson.prerequisites.join(", ")}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  <Check size={13} className="text-emerald-500" /> {lesson.level}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.alert(
                      `Lesson preview for "${lesson.title}" will be fully interactive with server-side quizzes in Phase 4!`
                    )
                  }
                >
                  Preview
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<BookOpen size={24} />}
          title="No lessons match your filters"
          description="Try broadening your search keyword, selecting 'All' domains, or resetting your difficulty filter."
          actionLabel="Clear all filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
};
