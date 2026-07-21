import { Plus } from "lucide-react";
import { Button, ButtonProps } from "@/ui/Button";

export function CreateNewButtonMobile(props: ButtonProps) {
  return (
    <Button
      iconLeft={<Plus    />}
      variant="secondary"
      outlined
      {...props}
    />
  );
}
