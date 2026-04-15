import { Pen, Pencil } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";

export function DetailEditButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="-m-2 rounded-full"
      variant="ghost"
      size="small"
      iconLeft={props.isPending ? undefined : <Pencil size={16} />}
    />
  );
}
