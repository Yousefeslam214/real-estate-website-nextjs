import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(language: "ar" | "en") {
  // Generate a random date in the past year
  const now = Date.now();
  const randomOffset = Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000);
  const date = new Date(now - randomOffset);
  return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-EG", {
    year: "numeric",
    month: "long",
  });
}
export function readTime(language: "ar" | "en") {
  const minutes = Math.floor(Math.random() * 9) + 2;
  return language === "ar"
    ? `${minutes} دقيقة قراءة`
    : `${minutes} min read`;
}
