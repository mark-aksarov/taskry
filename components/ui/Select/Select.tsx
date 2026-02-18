"use client";

import React, { useCallback, useState } from "react";
import { Popover } from "../Popover";
import { SelectListBox } from "./SelectListBox";
import { useSelectState } from "react-stately";
import { HiddenSelect, useSelect, type AriaSelectProps } from "react-aria";
import { fieldStyles, fieldLabelStyles, fieldErrorStyles } from "../Field";
import { BottomSheet } from "../BottomSheet";
import { SelectButton } from "./SelectButton";
import { useResizeObserver } from "@react-aria/utils";
import { Dialog } from "../Dialog";
import { twMerge } from "tailwind-merge";

interface SelectOwnProps {
  "data-test"?: string;
  overlayType?: "popover" | "bottomsheet";
  overlayClassName?: string;
  className?: string;
  optionClassName?: string;
  buttonClassName?: string;
}

export type SelectProps<T extends object = any> = AriaSelectProps<T> &
  React.RefAttributes<HTMLDivElement> &
  SelectOwnProps;

export const Select = <T extends object = any>({
  "data-test": dataTest,
  placeholder = "Select an option",
  overlayType,
  className,
  overlayClassName,
  optionClassName,
  buttonClassName,
  ...props
}: SelectProps<T>) => {
  const validationBehavior = props.validationBehavior ?? "native";

  const state = useSelectState({ ...props, validationBehavior });

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    hiddenSelectProps,
    ...validation
  } = useSelect<T>({ ...props, validationBehavior }, state, triggerRef);

  const listBoxProps = {
    ...menuProps,
    state,
    className: "py-1.5 outline-hidden",
    optionClassName: optionClassName,
  };

  /**
   * https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/Select.tsx
   *
   * It measures the trigger button width, which is used to make the Popover match the width of the button.
   */
  const [buttonWidth, setButtonWidth] = useState<string | null>(null);
  const onResize = useCallback(() => {
    if (triggerRef.current) {
      setButtonWidth(triggerRef.current.offsetWidth + "px");
    }
  }, [triggerRef]);

  useResizeObserver({
    ref: triggerRef,
    onResize: onResize,
  });

  const dialogProps = {
    "aria-labelledby": menuProps["aria-labelledby"],
    className: "max-h-[inherit] overflow-y-auto",
  };

  return (
    <div
      data-test={dataTest}
      data-testid="select"
      ref={props.ref}
      className={fieldStyles({ className })}
    >
      <span
        data-testid="select-label"
        {...labelProps}
        className={fieldLabelStyles()}
      >
        {props.label}
      </span>
      <HiddenSelect {...hiddenSelectProps} />
      <SelectButton
        {...triggerProps}
        ref={triggerRef}
        placeholder={placeholder}
        valueProps={valueProps}
        className={buttonClassName}
        state={state}
        validation={validation}
      />
      {validation.isInvalid && props.errorMessage && (
        <span className={fieldErrorStyles()}>
          {typeof props.errorMessage === "function"
            ? props.errorMessage(validation)
            : props.errorMessage}
        </span>
      )}
      {overlayType === "bottomsheet" ? (
        <BottomSheet
          isDismissable={true}
          state={state}
          className={twMerge("max-h-[calc(100dvh-64px)]", overlayClassName)}
        >
          <Dialog {...dialogProps}>
            <SelectListBox {...listBoxProps} />
          </Dialog>
        </BottomSheet>
      ) : (
        <Popover
          state={state}
          triggerRef={triggerRef}
          placement="bottom left"
          className={overlayClassName}
          style={{ "--trigger-width": buttonWidth } as React.CSSProperties}
        >
          <Dialog {...dialogProps}>
            <SelectListBox {...listBoxProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
};
