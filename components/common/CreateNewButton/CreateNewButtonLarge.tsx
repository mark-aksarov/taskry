import { Plus } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";

export function CreateNewButtonLarge(props: ButtonProps) {
  return (
    <Button
      iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      {...props}
    />
  );
}
