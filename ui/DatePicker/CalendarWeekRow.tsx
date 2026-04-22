import React from "react";
import { CalendarCell } from "./CalendarCell";
import { CalendarState, RangeCalendarState } from "react-stately";

type CalendarWeekRowProps = {
  weekIndex: number;
  state: CalendarState | RangeCalendarState;
};

export function CalendarWeekRow({ weekIndex, state }: CalendarWeekRowProps) {
  const dates = state.getDatesInWeek(weekIndex);

  return (
    <tr>
      {dates.map((date, i) =>
        date ? (
          <CalendarCell key={i} state={state} date={date} />
        ) : (
          <td key={i} aria-hidden="true" />
        ),
      )}
    </tr>
  );
}
