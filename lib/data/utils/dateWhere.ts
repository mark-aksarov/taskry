import { addDays, endOfDay, startOfDay } from "./date";

export type DateQuickFilter = "today" | "tomorrow" | "overdue";

interface BuildDateWhereParams {
  quick?: DateQuickFilter;
  dateStart?: string;
  dateEnd?: string;
  now?: Date;
}

export function buildDateWhere({
  quick,
  dateStart,
  dateEnd,
  now = new Date(),
}: BuildDateWhereParams) {
  if (quick) {
    switch (quick) {
      case "today":
        return {
          gte: startOfDay(now),
          lte: endOfDay(now),
        };

      case "tomorrow": {
        const tomorrow = addDays(now, 1);
        return {
          gte: startOfDay(tomorrow),
          lte: endOfDay(tomorrow),
        };
      }

      case "overdue":
        return {
          lt: now,
        };
    }
  }

  if (dateStart || dateEnd) {
    return {
      ...(dateStart && { gte: startOfDay(new Date(dateStart)) }),
      ...(dateEnd && { lte: endOfDay(new Date(dateEnd)) }),
    };
  }

  return undefined;
}
