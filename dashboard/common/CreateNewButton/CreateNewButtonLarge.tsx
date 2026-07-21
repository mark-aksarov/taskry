import { Plus } from "lucide-react";
import { Button, ButtonProps } from "@/ui/Button";

export function CreateNewButtonLarge(props: ButtonProps) {
  return (
    <Button
      variant="accent"
      iconLeft={<Plus    />}
      {...props}
    />
  );
}
