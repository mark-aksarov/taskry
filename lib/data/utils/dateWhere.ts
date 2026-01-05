// buildDateWhere.ts
import { DeadlineQuickFilter } from "@/lib/types";
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfWeek,
  endOfWeek,
} from "date-fns";

interface BuildDateWhereParams {
  quick?: DeadlineQuickFilter;
  dateStart?: string;
  dateEnd?: string;
  now?: Date;
}

/**
 * Возвращает Prisma-style фильтр по дате
 */
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

      case "thisWeek":
        return {
          gte: startOfWeek(now, { weekStartsOn: 1 }),
          lte: endOfWeek(now, { weekStartsOn: 1 }),
        };

      case "overdue":
        return {
          lt: startOfDay(now),
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
