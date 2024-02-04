import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNameInitials(name: string): string {
  const words = name.split(' ');
  return words.map(word => word[0].toUpperCase()).join('');
}
