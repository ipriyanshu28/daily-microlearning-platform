import { Lesson, LearningPath } from "../types/lesson";

/**
 * DEMO ONLY: Static placeholder data for Phase 1 interface development.
 * Authoritative persistence and dynamic retrieval will be introduced in Phase 3.
 */
export const DEMO_FEATURED_LESSON: Lesson = {
  id: "lesson-dsa-01",
  title: "Understand Big O Notation Without the Jargon",
  slug: "understand-big-o-notation",
  description:
    "Learn how software engineers evaluate algorithm scalability and time complexity before running a single benchmark.",
  domain: "Data Structures & Algorithms",
  durationMinutes: 8,
  level: "Beginner",
  prerequisites: ["Basic programming arithmetic"],
  keyTakeaway: "Big O measures how execution time grows relative to input size (n).",
  isFeatured: true,
};

export const DEMO_LESSONS: Lesson[] = [
  DEMO_FEATURED_LESSON,
  {
    id: "lesson-dsa-02",
    title: "Mastering Arrays & Contiguous Memory",
    slug: "arrays-and-memory",
    description:
      "Explore how CPU cache locality and contiguous memory make array index lookups O(1) in modern architectures.",
    domain: "Data Structures & Algorithms",
    durationMinutes: 10,
    level: "Beginner",
    prerequisites: ["Understand Big O Notation"],
    keyTakeaway: "Direct index access is constant time; arbitrary insertions require O(n) element shifts.",
  },
  {
    id: "lesson-java-01",
    title: "Java Memory Model: Stack vs. Heap",
    slug: "java-stack-vs-heap",
    description:
      "Demystify how primitive types and object references are allocated, passed by value, and collected by the JVM.",
    domain: "Java Fundamentals",
    durationMinutes: 12,
    level: "Beginner",
    prerequisites: ["Basic Java syntax"],
    keyTakeaway: "Primitive values and method frames live on the stack; objects reside in heap memory.",
  },
  {
    id: "lesson-web-01",
    title: "How the Browser Event Loop Actually Works",
    slug: "browser-event-loop",
    description:
      "Understand the call stack, microtask queue (Promises), and macrotask queue (setTimeout) to prevent UI blocking.",
    domain: "Web Development",
    durationMinutes: 9,
    level: "Intermediate",
    prerequisites: ["JavaScript asynchronous functions"],
    keyTakeaway: "Microtasks always drain before the browser yields to the next rendering frame or macrotask.",
  },
  {
    id: "lesson-sec-01",
    title: "SQL Injection Prevention & Prepared Statements",
    slug: "sql-injection-prevention",
    description:
      "See why string concatenation in database queries fails and how parameter binding separates code from untrusted data.",
    domain: "Cybersecurity & Systems",
    durationMinutes: 11,
    level: "Beginner",
    prerequisites: ["Basic SQL queries"],
    keyTakeaway: "Parameterized queries ensure the database engine treats input exclusively as data literals.",
  },
  {
    id: "lesson-dsa-03",
    title: "Two-Pointer Technique for Sorted Arrays",
    slug: "two-pointer-technique",
    description:
      "Reduce nested O(n²) loops to a clean O(n) single pass using opposing or synchronized array pointers.",
    domain: "Data Structures & Algorithms",
    durationMinutes: 14,
    level: "Intermediate",
    prerequisites: ["Mastering Arrays & Contiguous Memory"],
    keyTakeaway: "Exploiting sorted order allows eliminating entire sub-search spaces in each iteration.",
  },
];

export const DEMO_LEARNING_PATHS: LearningPath[] = [
  {
    id: "path-dsa-foundation",
    title: "DSA & Algorithmic Problem Solving",
    domain: "Data Structures & Algorithms",
    description: "Structured path from Big O fundamentals through common interview patterns.",
    totalLessons: 18,
    completedLessons: 4,
    level: "Beginner",
  },
  {
    id: "path-java-core",
    title: "Modern Java & JVM Internals",
    domain: "Java Fundamentals",
    description: "Deep dive into object-oriented design, collections, and multi-threaded JVM operations.",
    totalLessons: 14,
    completedLessons: 2,
    level: "Intermediate",
  },
  {
    id: "path-web-performance",
    title: "Full-Stack Web Architecture & Security",
    domain: "Web Development",
    description: "HTTP caching, browser rendering pipelines, and defensive API design.",
    totalLessons: 16,
    completedLessons: 0,
    level: "Intermediate",
  },
];
