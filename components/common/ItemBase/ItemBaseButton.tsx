import { twMerge } from "tailwind-merge";
import { Button, ButtonProps } from "@/components/ui/Button";

export interface ItemBaseButtonProps extends ButtonProps {
  "data-test"?: string;
}

export function ItemBaseButton({ className, ...props }: ItemBaseButtonProps) {
  return (
    <Button
      variant="outlined"
      className={twMerge(
        "h-[1.75rem] w-[3.75rem] justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}
