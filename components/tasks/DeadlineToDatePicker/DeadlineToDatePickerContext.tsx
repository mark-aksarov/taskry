"use client";

import { CalendarDate, parseDate } from "@internationalized/date";
import { useContext, createContext, useState, useMemo } from "react";

type ValueType = CalendarDate | null;

interface DeadlineToDatePicker {
  value: ValueType;
  updateValue: (value: ValueType) => void;
}

const DeadlineToDatePickerContext = createContext<DeadlineToDatePicker | null>(
  null,
);

interface DeadlineToDatePickerProviderProps {
  initialDate?: string;
  children: React.ReactNode;
}

export const DeadlineToDatePickerProvider = ({
  initialDate,
  children,
}: DeadlineToDatePickerProviderProps) => {
  const [value, setValue] = useState(
    initialDate ? parseDate(initialDate) : null,
  );

  const contextValue = useMemo(
    () => ({
      value,
      updateValue: setValue,
    }),
    [value],
  );

  return (
    <DeadlineToDatePickerContext.Provider value={contextValue}>
      {children}
    </DeadlineToDatePickerContext.Provider>
  );
};

export function useDeadlineToDatePicker() {
  const context = useContext(DeadlineToDatePickerContext);
  if (context === null) {
    throw new Error(
      "useDeadlineToDatePicker must be used within a DeadlineToDatePickerProvider",
    );
  }
  return context;
}
