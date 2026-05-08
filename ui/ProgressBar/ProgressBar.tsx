"use client";

import {
  Label,
  composeRenderProps,
  ProgressBar as RACProgressBar,
} from "react-aria-components";

import { tv } from "tailwind-variants";
import type { ProgressBarProps as RACProgressBarProps } from "react-aria-components";

export const progressBarStyles = tv({
  slots: {
    root: "flex flex-col gap-1",
    header: "flex justify-between gap-2",
    label: "text-xs font-medium text-(--text-secondary)",
    valueText: "text-xs font-medium text-(--text-secondary)",
    track: "h-1.5 overflow-hidden rounded-full bg-(--surface-tertiary)",
    fill: "h-full rounded-full transition-all",
  },

  variants: {
    color: {
      default: {
        fill: "",
      },
      low: {
        fill: "bg-red-500 dark:bg-red-700",
      },
      medium: {
        fill: "bg-orange-400 dark:bg-orange-600",
      },
      high: {
        fill: "bg-green-600 dark:bg-green-700",
      },
    },
  },

  defaultVariants: {
    color: "default",
  },
});

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
  const styles = progressBarStyles();

  const classes = composeRenderProps(className, (className) =>
    styles.root({ class: className }),
  );

  return (
    <RACProgressBar {...props} className={classes}>
      {({ percentage, valueText }) => {
        const safePercentage = percentage ?? 0;

        const color =
          safePercentage < 33 ? "low" : safePercentage < 66 ? "medium" : "high";

        return (
          <>
            {(label || showValueText) && (
              <div className={styles.header()}>
                {label && (
                  <Label className={styles.label({ class: textClassName })}>
                    {label}
                  </Label>
                )}
                {showValueText && (
                  <div className={styles.valueText({ class: textClassName })}>
                    {valueText}
                  </div>
                )}
              </div>
            )}

            <div className={styles.track()}>
              <div
                data-testid="progressbar-fill"
                className={styles.fill({ color })}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </>
        );
      }}
    </RACProgressBar>
  );
};
