import { twMerge } from "tailwind-merge";
import { Button, ButtonProps } from "@/components/ui";

export interface ItemBaseButtonProps
  extends Pick<ButtonProps, "label" | "iconLeft" | "className">,
    React.HTMLAttributes<HTMLElement> {}

export function ItemBaseButton({
  label,
  iconLeft,
  className,
}: ItemBaseButtonProps) {
  return (
    <Button
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
