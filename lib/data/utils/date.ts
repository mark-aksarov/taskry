export type DeadlineQuickFilter = "today" | "tomorrow" | "overdue";

const DAY_MS = 24 * 60 * 60 * 1000;

export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const endOfDay = (date: Date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  );

export const addDays = (date: Date, days: number) =>
  new Date(date.getTime() + days * DAY_MS);
