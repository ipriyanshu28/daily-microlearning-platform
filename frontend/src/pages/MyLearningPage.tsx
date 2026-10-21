import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Bookmark, CheckCircle2, ChevronRight } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { EmptyState } from "../components/ui/EmptyState";
import { DEMO_LEARNING_PATHS } from "../data/mockLessons";

type TabType = "paths" | "saved" | "completed";

export const MyLearningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("paths");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          My Learning Workspace
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Track your active learning pathways, bookmarked lessons, and verified milestones.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("paths")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "paths"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
          }`}
        >
          <BookOpen size={16} />
          <span>Active Learning Paths ({DEMO_LEARNING_PATHS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "saved"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
          }`}
        >
          <Bookmark size={16} />
          <span>Saved for Later (0)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("completed")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "completed"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
          }`}
        >
          <CheckCircle2 size={16} />
          <span>Completed Archive (0)</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "paths" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEMO_LEARNING_PATHS.map((path) => {
              const percent = Math.round((path.completedLessons / path.totalLessons) * 100);

              return (
                <Card key={path.id} hoverEffect className="flex flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="primary" size="sm">
                        {path.domain}
                      </Badge>
                      <span className="text-[11px] font-semibold text-slate-400">{path.level}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{path.title}</h3>
                    <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                      {path.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                    <ProgressBar
                      value={percent}
                      label={`${path.completedLessons} of ${path.totalLessons} lessons`}
                      showValueLabel
                      color={percent > 0 ? "indigo" : "indigo"}
                      size="sm"
                    />

                    <Link to="/discover" className="block">
                      <Button variant="outline" size="sm" className="w-full" rightIcon={<ChevronRight size={14} />}>
                        Continue Path
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>

          <p className="text-center text-[11px] text-slate-400 italic pt-2">
            Demo enrolled pathways · Custom user enrollment will be stored in PostgreSQL (Phase 3).
          </p>
        </div>
      )}

      {activeTab === "saved" && (
        <EmptyState
          icon={<Bookmark size={24} />}
          title="No lessons saved yet"
          description="When browsing the lesson catalog, you can bookmark concepts you want to study later."
          actionLabel="Browse lesson catalog"
          onAction={() => (window.location.href = "/discover")}
        />
      )}

      {activeTab === "completed" && (
        <EmptyState
          icon={<CheckCircle2 size={24} />}
          title="No completed lessons in archive"
          description="Completed lessons and your assessment score history will automatically appear here once authenticated."
          actionLabel="Explore today's lesson"
          onAction={() => (window.location.href = "/")}
        />
      )}
    </div>
  );
};
