import {
  DateValue,
  mergeProps,
  useFocusRing,
  useCalendarCell,
  AriaCalendarCellProps,
} from "react-aria";

import React from "react";
import { focusRing } from "../styles";
import { tv } from "tailwind-variants";
import { CalendarState, RangeCalendarState } from "react-stately";

type CalendarCellProps = AriaCalendarCellProps & {
  state: CalendarState | RangeCalendarState;
  date: DateValue;
};

const calendarCell = tv({
  extend: focusRing,
  base: [
    "h-8 w-8",
    "flex items-center justify-center",
    "cursor-default",
    "rounded-lg",
    "text-sm font-normal text-(--text-primary)",
  ],
  variants: {
    isSelected: {
      true: "bg-(--accent) text-white",
    },
    isDisabled: {
      true: "text-(--text-disabled)",
    },
    isUnavailable: {
      true: "text-(--control-text-error)",
    },
  },
  compoundVariants: [
    {
      isSelected: false,
      isDisabled: false,
      className: "hover:bg-(--accent-hover) hover:text-white",
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
    className: "m-auto",
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
