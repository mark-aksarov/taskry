"use client";

import {
  composeRenderProps,
  CheckboxGroup as RACCheckboxGroup,
} from "react-aria-components";

import { twMerge } from "tailwind-merge";
import { fieldStyles, Label } from "../Field";
import type { CheckboxGroupProps as RACCheckboxGroupProps } from "react-aria-components";

export type CheckboxGroupProps = RACCheckboxGroupProps &
  React.RefAttributes<HTMLDivElement> & {
    label: string;
  };

export function CheckboxGroup({
  label,
  className,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <RACCheckboxGroup
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        fieldStyles({
          ...renderProps,
          className: twMerge(className, "relative items-start"),
        }),
      )}
    >
      <>
        <Label>{label}</Label>
        {children}
      </>
    </RACCheckboxGroup>
  );
}
