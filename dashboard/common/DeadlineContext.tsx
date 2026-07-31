"use client";

import { useLocale } from "next-intl";
import { enUS, ru } from "date-fns/locale";
import { useContext, createContext, useMemo } from "react";
import { endOfDay, formatDistanceToNow, isPast } from "date-fns";

interface DeadlineContextType {
  deadline: Date;
  overdue: string | null;
}

const DeadlineContext = createContext<DeadlineContextType | null>(null);

interface DeadlineProviderProps {
  deadline: string;
  children: React.ReactNode;
}

export function DeadlineProvider({
  deadline,
  children,
}: DeadlineProviderProps) {
  const locale = useLocale();

  // The deadline is stored in the database as a Date without a time component.
  // The value is received as an ISO string, so we convert it to a Date and use the end of the day for overdue calculations.
  const deadlineDate = endOfDay(new Date(deadline));

  // Check if the deadline is overdue
  const isOverdue = isPast(deadlineDate);

  let overdue = null;
  if (isOverdue) {
    // Calculate how much time has passed since the deadline.
    overdue = formatDistanceToNow(deadlineDate, {
      addSuffix: true,
      locale: locale === "en" ? enUS : ru,
    });
  }

  const contextValue = useMemo(
    () => ({ deadline: deadlineDate, overdue }),
    [deadlineDate, overdue],
  );

  return (
    <DeadlineContext.Provider value={contextValue}>
      {children}
    </DeadlineContext.Provider>
  );
}

export function useDeadline() {
  const context = useContext(DeadlineContext);
  if (!context) {
    throw new Error("useDeadline must be used within DeadlineContext.Provider");
  }
  return context;
}
