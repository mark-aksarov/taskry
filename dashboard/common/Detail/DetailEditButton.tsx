import { Pencil } from "lucide-react";
import { Button, ButtonProps } from "@/ui/Button";

export function DetailEditButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="-my-2 rounded-full disabled:bg-transparent"
      variant="primary"
      size="small"
      iconLeft={
        props.isPending ? undefined : <Pencil size={14} strokeWidth={1.25} />
      }
    />
  );
}
