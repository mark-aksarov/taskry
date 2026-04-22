import React from "react";
import { CalendarWeekRow } from "./CalendarWeekRow";
import { getWeeksInMonth } from "@internationalized/date";
import { CalendarHeaderCell } from "./CalendarHeaderCell";
import { CalendarState, RangeCalendarState } from "react-stately";
import { useLocale, useCalendarGrid, AriaCalendarGridProps } from "react-aria";

type CalendarGridProps = AriaCalendarGridProps & {
  state: CalendarState | RangeCalendarState;
};

export function CalendarGrid({ state, ...props }: CalendarGridProps) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);
  const weeks = Array.from({ length: weeksInMonth }, (_, i) => i);

  return (
    <table {...gridProps} cellPadding={0} className="flex-1">
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <CalendarHeaderCell key={index} day={day} />
          ))}
        </tr>
      </thead>

      <tbody>
        {weeks.map((weekIndex) => (
          <CalendarWeekRow
            key={weekIndex}
            weekIndex={weekIndex}
            state={state}
          />
        ))}
      </tbody>
    </table>
  );
}
