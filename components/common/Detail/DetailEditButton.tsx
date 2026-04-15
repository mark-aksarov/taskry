import { Pen } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";

export function DetailEditButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="-m-2 rounded-full text-gray-500 dark:text-gray-400"
      variant="ghost"
      size="small"
      iconLeft={
        props.isPending ? undefined : (
          <Pen size={16} absoluteStrokeWidth strokeWidth={1.5} />
        )
      }
    />
  );
}
