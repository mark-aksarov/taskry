import clsx from "clsx";
import type { ProgressBarProps as RACProgressBarProps } from "react-aria-components";
import { ProgressBar as RACProgressBar, Label } from "react-aria-components";

interface ProgressBarProps extends RACProgressBarProps {
  label: React.ReactNode;
}

export const ProgressBar = ({
  label,
  className,
  ...props
}: ProgressBarProps) => {
  const classes = clsx(className, "flex flex-col gap-1");
  const textClasses = clsx(
    "text-xs font-medium text-gray-500 dark:text-gray-400",
  );

  return (
    <RACProgressBar {...props} className={classes}>
      {({ percentage, valueText }) => (
        <>
          <div className="flex justify-between gap-2">
            <Label className={textClasses}>{label}</Label>
            <span className={textClasses}>{valueText}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              data-testid="progressbar-fill"
              className={clsx(
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
