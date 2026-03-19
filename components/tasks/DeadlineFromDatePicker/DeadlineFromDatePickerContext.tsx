"use client";

import { CalendarDate, parseDate } from "@internationalized/date";
import { useContext, createContext, useState, useMemo } from "react";

type ValueType = CalendarDate | null;

interface DeadlineFromDatePicker {
  value: ValueType;
  updateValue: (value: ValueType) => void;
}

const DeadlineFromDatePickerContext =
  createContext<DeadlineFromDatePicker | null>(null);

interface DeadlineFromDatePickerProviderProps {
  initialDate?: string;
  children: React.ReactNode;
}

export const DeadlineFromDatePickerProvider = ({
  initialDate,
  children,
}: DeadlineFromDatePickerProviderProps) => {
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
    <DeadlineFromDatePickerContext.Provider value={contextValue}>
      {children}
    </DeadlineFromDatePickerContext.Provider>
  );
};

export function useDeadlineFromDatePicker() {
  const context = useContext(DeadlineFromDatePickerContext);
  if (context === null) {
    throw new Error(
      "useDeadlineFromDatePicker must be used within a DeadlineFromDatePickerProvider",
    );
  }
  return context;
}
