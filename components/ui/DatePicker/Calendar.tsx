import {
  AriaCalendarCellProps,
  AriaCalendarGridProps,
  AriaCalendarProps,
  DateValue,
  mergeProps,
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useFocusRing,
  useLocale,
} from "react-aria";
import React from "react";
import { Button } from "../Button";
import {
  CalendarState,
  RangeCalendarState,
  useCalendarState,
} from "react-stately";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createCalendar, getWeeksInMonth } from "@internationalized/date";
import { tv } from "tailwind-variants";
import { focusRing } from "../styles";
import { Separator } from "../Separator";

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
    <div
      {...calendarProps}
      className="flex flex-col gap-4 text-black dark:text-white"
    >
      <div className="flex items-center justify-between">
        <Button
          {...prevButtonProps}
          variant="outlined"
          iconLeft={
            <ChevronLeft size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
        />
        <h2 className="text-base font-bold">{title}</h2>
        <Button
          {...nextButtonProps}
          variant="outlined"
          iconLeft={
            <ChevronRight size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
        />
      </div>
      <Separator />
      <CalendarGrid state={state} firstDayOfWeek={props.firstDayOfWeek} />
    </div>
  );
};

/*
 * Props for the CalendarGrid component.
 *
 * - `AriaCalendarGridProps` is used by `useCalendarGrid`, which provides
 *   behavior and accessibility for the calendar grid component.
 */
type CalendarGridProps = AriaCalendarGridProps & {
  /**
   * manage selection and focus state across the calendar.
   */
  state: CalendarState | RangeCalendarState;
};

export const CalendarGrid = ({ state, ...props }: CalendarGridProps) => {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} cellPadding="0" className="flex-1">
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th className="text-center" key={index}>
              <div className="flex h-8 w-8 items-center justify-center text-sm font-bold">
                {day}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                ),
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/*
 * Props for the CalendarCell component.
 *
 * - `AriaCalendarCellProps` is used by `useCalendarCell`, which provides
 *   behavior and accessibility for a single date cell within a calendar grid.
 *   A calendar cell represents a date that can be selected by the user.
 */
type CalendarCellProps = AriaCalendarCellProps & {
  /**
   * manage selection and focus state across the calendar.
   */
  state: CalendarState | RangeCalendarState;
  /**
   * specifies the date value for this cell.
   */
  date: DateValue;
};

const calendarCell = tv({
  extend: focusRing,
  base: "flex h-8 w-8 cursor-default items-center justify-center rounded-lg text-sm font-normal",
  variants: {
    isSelected: {
      true: "bg-blue-700 text-white dark:bg-blue-800",
    },
    isDisabled: {
      true: "text-gray-400 dark:text-gray-500",
    },
    isUnavailable: {
      true: "text-red-600 dark:text-red-700",
    },
  },
  compoundVariants: [
    {
      isSelected: false,
      isDisabled: false,
      className: "hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600",
    },
  ],
});

export const CalendarCell = ({ state, date }: CalendarCellProps) => {
  const ref = React.useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  const { focusProps, isFocusVisible } = useFocusRing();

  const calendarCellClasses = calendarCell({
    isFocusVisible,
    isSelected,
    isDisabled,
    isUnavailable,
  });

  return (
    <td {...cellProps} className="p-2 text-center">
      <div
        {...mergeProps(focusProps, buttonProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={calendarCellClasses}
      >
        {formattedDate}
      </div>
    </td>
  );
};
