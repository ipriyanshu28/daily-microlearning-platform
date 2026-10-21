export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export type LearningDomain =
  | "Data Structures & Algorithms"
  | "Java Fundamentals"
  | "Web Development"
  | "Cybersecurity & Systems";

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  domain: LearningDomain;
  durationMinutes: number;
  level: SkillLevel;
  prerequisites: string[];
  keyTakeaway: string;
  isFeatured?: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  domain: LearningDomain;
  description: string;
  totalLessons: number;
  completedLessons: number;
  level: SkillLevel;
}
