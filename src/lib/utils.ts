/** Generate a short alphanumeric referral code */
export function generateReferralCode(length = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}

/** Calculate a "High-Signal" lead score (0–100) based on years of experience */
export function calcSignalScore(yearsExperience: number): number {
  if (yearsExperience >= 10) return 95;
  if (yearsExperience >= 5) return 80;
  if (yearsExperience >= 2) return 65;
  if (yearsExperience >= 1) return 50;
  return 35;
}

/** Truncate text to N words */
export function truncate(text: string, maxWords = 40): string {
  const words = text.split(" ");
  return words.length <= maxWords
    ? text
    : words.slice(0, maxWords).join(" ") + "…";
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
