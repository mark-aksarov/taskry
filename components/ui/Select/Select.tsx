import React, { useCallback, useState } from "react";
import { Popover } from "../Popover";
import { SelectListBox } from "./SelectListBox";
import { useSelectState } from "react-stately";
import { HiddenSelect, useSelect, type AriaSelectProps } from "react-aria";
import clsx from "clsx";
import { fieldStyles, fieldLabelStyles, fieldErrorStyles } from "../Field";
import { BottomSheet } from "../BottomSheet";
import { SelectButton } from "./SelectButton";
import { useResizeObserver } from "@react-aria/utils";
import { Dialog } from "../Dialog";

interface SelectOwnProps {
  overlayType?: "popover" | "bottomsheet";
  overlayClassName?: string;
  className?: string;
  optionClassName?: string;
}

export type SelectProps<T extends object = any> = AriaSelectProps<T> &
  React.RefAttributes<HTMLDivElement> &
  SelectOwnProps;

export const Select = <T extends object = any>({
  placeholder = "Select an option",
  overlayType,
  className,
  overlayClassName,
  optionClassName,
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

  return (
    <div
      data-testid="select"
      ref={props.ref}
      className={clsx(fieldStyles(), className)}
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

      {state.isOpen &&
        (overlayType === "bottomsheet" ? (
          <BottomSheet state={state} className={overlayClassName}>
            <Dialog aria-labelledby={menuProps["aria-labelledby"]}>
              <SelectListBox {...listBoxProps} />
            </Dialog>
          </BottomSheet>
        ) : (
          <Popover
            state={state}
            triggerRef={triggerRef}
            placement="bottom start"
            className={overlayClassName}
            style={{ "--trigger-width": buttonWidth } as React.CSSProperties}
          >
            <Dialog aria-labelledby={menuProps["aria-labelledby"]}>
              <SelectListBox {...listBoxProps} />
            </Dialog>
          </Popover>
        ))}
    </div>
  );
};
