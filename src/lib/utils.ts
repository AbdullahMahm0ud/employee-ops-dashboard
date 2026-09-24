import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

export function fullName(first: string, last: string) {
  return `${first} ${last}`.trim();
}

export function avatarTone(name: string) {
  const tones = [
    "bg-primary/15 text-primary",
    "bg-ink/10 text-ink",
    "bg-warn/15 text-warn",
    "bg-success/15 text-success",
    "bg-line text-ink",
  ] as const;
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash + name.charCodeAt(i) * (i + 1)) % tones.length;
  return tones[hash] ?? tones[0];
}
