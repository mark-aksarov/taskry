import {
  addDays,
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek,
} from "date-fns";

const now = new Date();

export const dates = {
  overdue: addDays(startOfDay(now), -5),
  today: endOfDay(now),
  tomorrow: endOfDay(addDays(now, 1)),
  thisWeek: endOfWeek(now, { weekStartsOn: 1 }),
  nextWeek: endOfWeek(addDays(now, 7), { weekStartsOn: 1 }),
  prevWeek: startOfWeek(addDays(now, -7), { weekStartsOn: 1 }),
};
