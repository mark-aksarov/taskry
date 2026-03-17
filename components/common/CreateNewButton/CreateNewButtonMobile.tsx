import { Plus } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";

export function CreateNewButtonMobile(props: ButtonProps) {
  return (
    <Button
      iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      variant="outlined"
      {...props}
    />
  );
}
