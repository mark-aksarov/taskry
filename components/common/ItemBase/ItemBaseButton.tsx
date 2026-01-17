import { twMerge } from "tailwind-merge";
import { Button, ButtonProps } from "@/components/ui";

interface ItemBaseButtonProps
  extends Pick<ButtonProps, "label" | "iconLeft" | "className"> {
  "data-test"?: string;
}

export function ItemBaseButton({
  label,
  iconLeft,
  className,
  "data-test": dataTest,
}: ItemBaseButtonProps) {
  return (
    <Button
      data-test={dataTest}
      variant="outlined"
      label={label}
      iconLeft={iconLeft}
      className={twMerge(
        "h-[1.75rem] w-[3.75rem] justify-center rounded-full",
        className,
      )}
    />
  );
}
