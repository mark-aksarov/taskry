import { twMerge } from "tailwind-merge";
import { Button, ButtonProps } from "@/ui/Button";

export function ItemBaseButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      variant="primary"
      outlined
      className={twMerge(
        "h-[1.75rem] w-[3.75rem] justify-center rounded-full",
        className,
      )}
    />
  );
}
