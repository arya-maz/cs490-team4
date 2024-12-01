import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function without TypeScript-specific type annotations
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
