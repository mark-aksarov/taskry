"use client";

import type { ProgressBarProps as RACProgressBarProps } from "react-aria-components";
import {
  ProgressBar as RACProgressBar,
  Label,
  composeRenderProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface ProgressBarProps extends RACProgressBarProps {
  label?: React.ReactNode;
  textClassName?: string;
  showValueText?: boolean;
}

export const ProgressBar = ({
  label,
  className,
  textClassName,
  showValueText = true,
  ...props
}: ProgressBarProps) => {
  const classes = composeRenderProps(className, (className) =>
    twMerge(className, "flex flex-col gap-1"),
  );
  const textClasses = twMerge(
    "text-xs font-medium text-gray-500 dark:text-gray-400",
    textClassName,
  );

  return (
    <RACProgressBar {...props} className={classes}>
      {({ percentage, valueText }) => (
        <>
          {(label || showValueText) && (
            <div className="flex justify-between gap-2">
              {label && <Label className={textClasses}>{label}</Label>}
              {showValueText && (
                <span className={textClasses}>{valueText}</span>
              )}
            </div>
          )}
          <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              data-testid="progressbar-fill"
              className={twMerge(
                "h-full rounded-full",
                percentage &&
                  (percentage < 33
                    ? "bg-red-500 dark:bg-red-700"
                    : percentage < 66
                      ? "bg-orange-400 dark:bg-orange-600"
                      : "bg-green-600 dark:bg-green-700"),
              )}
              style={{ width: percentage + "%" }}
            />
          </div>
        </>
      )}
    </RACProgressBar>
  );
};
