import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Compass,
  Flame,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Menu,
  Play,
  Sparkles,
  Target,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const navigation = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { label: "Discover", path: "/discover", icon: Compass },
  { label: "My learning", path: "/learning", icon: BookOpen },
  { label: "My progress", path: "/progress", icon: Trophy },
];

const lessons = [
  {
    category: "DATA STRUCTURES & ALGORITHMS",
    title: "Understand Big O notation",
    description:
      "Learn how to measure algorithm efficiency without running the code.",
    duration: "8 min",
    level: "Beginner",
    icon: Code2,
    color: "bg-blue-50 text-blue-700",
  },
  {
    category: "JAVA FUNDAMENTALS",
    title: "Master Java arrays",
    description:
      "Understand indexing, traversal, and common array operations.",
    duration: "10 min",
    level: "Beginner",
    icon: Brain,
    color: "bg-violet-50 text-violet-700",
  },
  {
    category: "PROBLEM SOLVING",
    title: "Think through a coding problem",
    description:
      "Practice breaking a problem into smaller, manageable steps.",
    duration: "7 min",
    level: "Beginner",
    icon: Lightbulb,
    color: "bg-amber-50 text-amber-700",
  },
];

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const pageTitle =
    navigation.find((item) => item.path === location.pathname)?.label ??
    "Your learning space";

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-800">
      {menuOpen && (
        <button
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-slate-950/30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200/80 bg-white px-5 py-6 transition-transform md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between px-1">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <GraduationCap size={23} />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-slate-900">
                Skill<span className="text-indigo-600">Daily</span>
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Learn a little. Grow a lot.
              </p>
            </div>
          </NavLink>

          <button
            aria-label="Close menu"
            className="rounded-lg p-2 text-slate-500 md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon size={19} />
              {label}
              {path === "/learning" && (
                <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px]">
                  03
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-4 text-white">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
              <Sparkles size={19} />
            </div>
            <p className="text-sm font-bold">Small steps, big progress.</p>
            <p className="mt-1 text-xs leading-5 text-indigo-100">
              A few focused minutes can make a difference every day.
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[35%] rounded-full bg-white" />
            </div>
            <p className="mt-2 text-[10px] text-indigo-100">
              Sample learning goal
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
              Y
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-800">
                Your profile
              </p>
              <p className="text-xs text-slate-400">Learning enthusiast</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-h-screen md:pl-64">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200/70 bg-white/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation menu"
              className="rounded-xl border border-slate-200 p-2 text-slate-600 md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-sm font-bold text-slate-800">{pageTitle}</p>
              <p className="hidden text-xs text-slate-400 sm:block">
                Your personal space to learn and grow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 sm:flex">
              <Flame size={17} className="text-orange-500" />
              <span className="text-xs font-bold text-orange-700">
                Start your streak
              </span>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 text-xs font-extrabold text-indigo-700">
              Y
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-4 py-7 sm:px-7 sm:py-9 lg:px-10">
          <Outlet />
        </main>

        <footer className="px-6 pb-7 text-center text-xs text-slate-400">
          SkillDaily · Learn something useful, every day.
        </footer>
      </div>
    </div>
  );
}

function Dashboard() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700">
            <Sparkles size={14} />
            Your daily learning space
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Make today <span className="text-indigo-600">count.</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            A little learning every day adds up. Explore a concept, practice a
            skill, and get one step closer to your goals.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={17} />
          <span>Today's learning plan</span>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#172554] via-[#312e81] to-[#4338ca] p-6 text-white shadow-xl shadow-indigo-950/10 sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-4 -top-12 h-52 w-52 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-100">
              <Zap size={13} />
              Today's featured lesson
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-200">
              Data structures & algorithms
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Big O notation, made simple
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-indigo-100/80">
              Discover how to estimate the efficiency of your code and why
              interviewers care about it.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-indigo-100">
              <span className="flex items-center gap-1.5">
                <Clock3 size={15} /> 8 minutes
              </span>
              <span className="h-1 w-1 rounded-full bg-indigo-300" />
              <span>Beginner friendly</span>
              <span className="h-1 w-1 rounded-full bg-indigo-300" />
              <span>5 practice questions</span>
            </div>

            <button
              onClick={() => setCompleted((value) => !value)}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-800 shadow-lg shadow-indigo-950/20 transition hover:-translate-y-0.5 hover:bg-indigo-50"
            >
              {completed ? (
                <>
                  <CheckCircle2 size={17} /> Marked as complete
                </>
              ) : (
                <>
                  Start learning <ArrowRight size={17} />
                </>
              )}
            </button>
            {completed && (
              <p className="mt-3 text-xs text-indigo-100">
                This is a UI demo. Completion is not saved yet.
              </p>
            )}
          </div>

          <div className="hidden h-44 w-44 items-center justify-center rounded-[2rem] border border-white/15 bg-white/[0.07] md:flex">
            <div className="flex h-28 w-28 items-center justify-center rounded-[1.5rem] bg-white/10">
              <Code2 size={64} strokeWidth={1.2} className="text-indigo-100" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Flame}
          label="Learning streak"
          value="0 days"
          note="Start today"
          color="bg-orange-50 text-orange-600"
        />
        <StatCard
          icon={BookOpen}
          label="Lessons completed"
          value="0"
          note="Your journey starts here"
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={Target}
          label="Quiz accuracy"
          value="—"
          note="Take your first quiz"
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          icon={Zap}
          label="Learning points"
          value="0 XP"
          note="Earn points as you learn"
          color="bg-violet-50 text-violet-600"
        />
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                Keep exploring
              </p>
              <h2 className="mt-2 text-xl font-extrabold text-slate-900">
                Pick up a new skill
              </h2>
            </div>
            <NavLink
              to="/discover"
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Explore all <ChevronRight size={16} />
            </NavLink>
          </div>

          <div className="space-y-3">
            {lessons.map((lesson, index) => {
              const Icon = lesson.icon;

              return (
                <article
                  key={lesson.title}
                  className="group flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/40 sm:flex-row sm:items-center sm:p-5"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${lesson.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400">
                      {lesson.category}
                    </p>
                    <h3 className="mt-1 text-sm font-bold text-slate-800">
                      {lesson.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {lesson.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock3 size={13} /> {lesson.duration}
                      </span>
                      <span>{lesson.level}</span>
                    </div>
                  </div>

                  <button
                    aria-label={`Preview ${lesson.title}`}
                    onClick={() =>
                      window.alert(
                        "Lesson preview will be implemented in a later phase.",
                      )
                    }
                    className="flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-xl border border-slate-200 text-slate-500 transition group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 sm:self-center"
                  >
                    <Play size={16} />
                  </button>

                  {index === 0 && (
                    <span className="sr-only">Recommended first lesson</span>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Target size={19} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Your daily goal
                </h3>
                <p className="text-xs text-slate-400">Consistency over intensity</p>
              </div>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <span className="text-3xl font-extrabold text-slate-900">0/1</span>
              <span className="text-xs font-medium text-slate-400">
                lesson today
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-0 rounded-full bg-emerald-500" />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Complete one short lesson to begin building your daily learning
              habit.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Lightbulb size={20} />
            </div>
            <h3 className="mt-4 text-sm font-bold text-slate-900">
              A thought for today
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              You don't have to learn everything today. You just have to learn
              something and keep going.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-700">
              One step at a time <ArrowUpRight size={14} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Brain size={19} />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Revision corner
              </h3>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Previously learned concepts will appear here when your revision
              system is ready.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
              Coming in a later phase <ArrowDownRight size={14} />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

type StatCardProps = {
  icon: typeof Flame;
  label: string;
  value: string;
  note: string;
  color: string;
};

function StatCard({ icon: Icon, label, value, note, color }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
          <Icon size={20} />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Overview
        </span>
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white px-6 py-16 text-center sm:px-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <Sparkles size={26} />
      </div>
      <h1 className="mt-5 text-2xl font-extrabold text-slate-900">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
      <NavLink
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
      >
        Back to overview <ArrowRight size={16} />
      </NavLink>
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/discover"
          element={
            <PlaceholderPage
              title="Discover new skills"
              description="Explore personalized topics and learning paths. The lesson discovery experience will be built in a future step."
            />
          }
        />
        <Route
          path="/learning"
          element={
            <PlaceholderPage
              title="My learning"
              description="Your learning paths and saved lessons will appear here as the platform develops."
            />
          }
        />
        <Route
          path="/progress"
          element={
            <PlaceholderPage
              title="My progress"
              description="Your completed lessons, quiz results, and learning statistics will appear here once progress tracking is implemented."
            />
          }
        />
        <Route
          path="*"
          element={
            <PlaceholderPage
              title="Page not found"
              description="The page you're looking for doesn't exist."
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;