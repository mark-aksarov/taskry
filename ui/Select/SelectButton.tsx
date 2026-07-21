"use client";

import { tv } from "tailwind-variants";
import { fieldGroupStyles } from "../Field";
import { AriaButtonOptions, useButton } from "react-aria";
import React, { DOMAttributes } from "react";
import { SelectState } from "react-stately";
import { ChevronDown } from "lucide-react";
import { ValidationResult } from "react-aria-components";

export const buttonStyles = tv({
  extend: fieldGroupStyles,
  base: "flex cursor-pointer items-center justify-between",
  variants: {
    isFocusVisible: {
      true: "border-(--control-border-focused)",
    },
    isInvalid: {
      true: "border-(--control-border-error)",
    },
    isPressed: {
      true: "border-(--control-border-focused)",
    },
    isPlaceholder: {
      true: "",
    },
    isDisabled: {
      true: [
        "pointer-events-none",
        "cursor-default",
        "border-(--control-border-disabled)",
        "bg-(--control-surface-disabled)",
        "text-(--text-disabled)",
      ].join(" "),
    },
  },
  compoundVariants: [
    {
      isDisabled: false,
      isFocusVisible: false,
      isPressed: false,
      isInvalid: false,
      className: "border-(--border-primary)",
    },
    {
      isDisabled: false,
      isPlaceholder: true,
      className: "text-(--text-secondary)",
    },
    {
      isDisabled: false,
      isPlaceholder: false,
      className: "text-(--text-primary)",
    },
  ],
});

interface SelectButtonOwnProps<T extends object = any> {
  ref: React.RefObject<HTMLButtonElement | null>;
  state: SelectState<T>;
  valueProps: DOMAttributes<HTMLSpanElement>;
  placeholder: string;
  validation: ValidationResult;
  className?: string;
}

type SelectButtonProps = AriaButtonOptions<"button"> & SelectButtonOwnProps;

export const SelectButton = ({
  ref,
  state,
  valueProps,
  placeholder,
  validation,
  className,
  ...props
}: SelectButtonProps) => {
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={buttonStyles({
        isFocusVisible: state.isFocused,
        isDisabled: buttonProps.disabled,
        isInvalid: validation.isInvalid,
        isPlaceholder: !state.selectedItem,
        className: className,
      })}
    >
      <span
        {...valueProps}
        data-placeholder={!state.selectedItem}
        data-a11y-ignore-contrast={!state.selectedItem ? "true" : undefined}
        className="flex items-center gap-4"
      >
        {state.selectedItem ? state.selectedItem.rendered : placeholder}
      </span>
      <ChevronDown
        
        
        
        className={!buttonProps.disabled ? "text-(--text-primary)" : ""}
      />
    </button>
  );
};
