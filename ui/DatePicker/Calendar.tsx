import {
  DateValue,
  useLocale,
  useCalendar,
  AriaCalendarProps,
} from "react-aria";

import React from "react";
import { Separator } from "../Separator";
import { CalendarGrid } from "./CalendarGrid";
import { useCalendarState } from "react-stately";
import { CalendarHeader } from "./CalendarHeader";
import { createCalendar } from "@internationalized/date";

export const Calendar = <T extends DateValue>(props: AriaCalendarProps<T>) => {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  return (
    <div {...calendarProps} className="flex flex-col gap-4">
      <CalendarHeader
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
        title={title}
      />
      <Separator />
      <CalendarGrid state={state} firstDayOfWeek={props.firstDayOfWeek} />
    </div>
  );
};
