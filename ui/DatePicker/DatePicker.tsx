"use client";

import {
  fieldStyles,
  fieldGroupStyles,
  fieldLabelStyles,
  fieldErrorStyles,
} from "../Field";

import {
  DateValue,
  useDatePicker,
  useFocusRing,
  AriaDatePickerProps,
} from "react-aria";

import { Dialog } from "../Dialog";
import { Popover } from "../Popover";
import { focusRing } from "../styles";
import { Calendar } from "./Calendar";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { CalendarIcon } from "lucide-react";
import { BottomSheet } from "../BottomSheet";
import { useDatePickerState } from "react-stately";
import { DateSegment } from "react-aria-components";
import React, { useCallback, useState } from "react";
import { buttonStyles } from "../Select/SelectButton";
import { mergeProps, useResizeObserver } from "@react-aria/utils";
import { Button, DateFieldContext, DateInput } from "react-aria-components";

export interface DatePickerOwnProps {
  overlayType?: "popover" | "bottomsheet";
  className?: string;
  overlayClassName?: string;
  inputClassName?: string;
}

export type DatePickerProps<T extends DateValue> = AriaDatePickerProps<T> &
  React.RefAttributes<HTMLDivElement> &
  DatePickerOwnProps;

export const groupStyles = tv({
  extend: fieldGroupStyles,
  base: buttonStyles.base,
  variants: {
    isFocused: buttonStyles.variants.isFocusVisible,
    isPressed: buttonStyles.variants.isPressed,
    isInvalid: buttonStyles.variants.isInvalid,
    isDisabled: buttonStyles.variants.isDisabled,
  },
  compoundVariants: [
    {
      isDisabled: false,
      isFocused: false,
      isPressed: false,
      isInvalid: false,
      className: "border-(--border-primary)",
    },
  ],
});

const button = tv({
  extend: focusRing,
  base: "cursor-pointer rounded-xs",
  compoundVariants: [
    {
      isDisabled: false,
      className: "text-(--text-primary)",
    },
  ],
});

const segmentStyles = tv({
  base: "rounded-sm px-0.5 outline-none",
  variants: {
    isPlaceholder: {
      false: "text-(--text-primary)",
      true: "text-(--text-secondary)",
    },
    isDisabled: {
      true: "text-(--text-disabled)",
    },
    isFocused: {
      true: "bg-(--accent) text-white!",
    },
    isEditable: {
      false: "",
    },
  },
  compoundVariants: [
    {
      isEditable: false,
      isDisabled: false,
      className: "text-(--text-secondary)",
    },
  ],
});

export const DatePicker = <T extends DateValue>({
  overlayType,
  className,
  overlayClassName,
  inputClassName,
  ...props
}: DatePickerProps<T>) => {
  const validationBehavior = props.validationBehavior ?? "native";

  const state = useDatePickerState({ ...props, validationBehavior });

  const groupRef = React.useRef<HTMLDivElement>(null);
  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    ...validation
  } = useDatePicker(
    {
      ...props,
      validationBehavior,
      label: !props["aria-label"] && !props["aria-labelledby"],
    },
    state,
    groupRef,
  );

  const { focusProps, isFocused } = useFocusRing({
    within: true,
  });

  /**
   * It measures the group width, which is used to make the Popover match the width of the group.
   */
  const [groupWidth, setGroupWidth] = useState<string | null>(null);
  const onResize = useCallback(() => {
    if (groupRef.current) {
      setGroupWidth(groupRef.current.offsetWidth + "px");
    }
  }, []);

  useResizeObserver({
    ref: groupRef,
    onResize: onResize,
  });

  return (
    /**
     * DateInput consumes `fieldProps` from context and internally creates a hidden input.
     * This hidden input ensures integration with form submission.
     */
    <DateFieldContext value={fieldProps}>
      <div
        data-testid="datepicker"
        ref={props.ref}
        className={fieldStyles({ className })}
      >
        {props.label && (
          <div {...labelProps} className={fieldLabelStyles()}>
            {props.label}
          </div>
        )}

        <div
          ref={groupRef}
          {...mergeProps(groupProps, focusProps)}
          className={groupStyles({
            isFocused,
            isPressed: state.isOpen,
            isDisabled: props.isDisabled,
            isInvalid: validation.isInvalid,
            className: inputClassName,
          })}
        >
          <DateInput className="flex">
            {(segment) => (
              <DateSegment
                segment={segment}
                className={(renderProps) =>
                  segmentStyles({
                    ...renderProps,
                    isEditable: segment.isEditable,
                  })
                }
              />
            )}
          </DateInput>

          <Button {...buttonProps} className={button}>
            <CalendarIcon size={16} strokeWidth={1.5} absoluteStrokeWidth />
          </Button>
        </div>

        {validation.isInvalid && props.errorMessage && (
          <div className={fieldErrorStyles()}>
            {typeof props.errorMessage === "function"
              ? props.errorMessage(validation)
              : props.errorMessage}
          </div>
        )}

        {overlayType === "bottomsheet" ? (
          <BottomSheet state={state} className="p-4" isDismissable={true}>
            <Dialog {...dialogProps}>
              <Calendar
                {...calendarProps}
                firstDayOfWeek={props.firstDayOfWeek}
              />
            </Dialog>
          </BottomSheet>
        ) : (
          <Popover
            state={state}
            triggerRef={groupRef}
            placement="bottom left"
            className={twMerge("p-4", overlayClassName)}
            style={{ "--trigger-width": groupWidth } as React.CSSProperties}
          >
            <Dialog {...dialogProps}>
              <Calendar
                {...calendarProps}
                firstDayOfWeek={props.firstDayOfWeek}
              />
            </Dialog>
          </Popover>
        )}
      </div>
    </DateFieldContext>
  );
};
