import { Button, ButtonProps } from "@/ui/Button";
import { ChevronRight } from "lucide-react";

interface NavigationButtonProps extends Omit<ButtonProps<"a">, "label"> {
  heading: string;
  subtext: string;
}

export function NavigationButton({
  heading,
  subtext,
  ...props
}: NavigationButtonProps) {
  return (
    <Button
      as="a"
      size="medium"
      variant="outlined"
      label={
        <div className="flex flex-col items-start gap-1">
          <div className="text-base font-semibold text-black dark:text-white">
            {heading}
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {subtext}
          </div>
        </div>
      }
      iconRight={
        <ChevronRight size={18} strokeWidth={1.5} absoluteStrokeWidth />
      }
      className="dark:pressed:bg-gray-700 pressed:bg-gray-200 w-full justify-between border-none bg-white px-4 py-3 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      {...props}
    />
  );
}
