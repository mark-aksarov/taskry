import { KeyRound, Pencil, Trash } from "lucide-react";
import { NavigationButton } from "@/components/common/NavigationButton";

export function ProfileActions() {
  return (
    <div className="flex flex-col gap-2.5">
      <NavigationButton variant="secondary">
        <Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Delete account
      </NavigationButton>
      <NavigationButton variant="secondary">
        <KeyRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Change password
      </NavigationButton>
      <NavigationButton variant="secondary">
        <Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Edit account
      </NavigationButton>
    </div>
  );
}
