import { Button } from "../Button";
import { AriaButtonProps } from "react-aria";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  prevButtonProps: AriaButtonProps<"button">;
  nextButtonProps: AriaButtonProps<"button">;
  title: string;
}

export function CalendarHeader({
  prevButtonProps,
  nextButtonProps,
  title,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        {...prevButtonProps}
        variant="primary"
        outlined
        iconLeft={
          <ChevronLeft    />
        }
      />
      <h2 className="text-base font-bold text-(--text-primary)">{title}</h2>
      <Button
        {...nextButtonProps}
        variant="primary"
        outlined
        iconLeft={
          <ChevronRight    />
        }
      />
    </div>
  );
}
