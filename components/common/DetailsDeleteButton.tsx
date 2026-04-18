import { Trash } from "lucide-react";
import { Button, ButtonProps } from "../ui/Button";

export function DetailsDeleteButton(props: ButtonProps) {
  return (
    <Button
      iconLeft={
        props.isPending ? undefined : (
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
        )
      }
      variant="outlined"
      {...props}
    />
  );
}
