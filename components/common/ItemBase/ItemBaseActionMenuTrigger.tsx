import {
  Button,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
  MenuTriggerProps,
} from "@/components/ui";
import { Ellipsis } from "lucide-react";
import { ResponsiveMenuTrigger } from "../ResponsiveMenuTrigger";

export function ItemBaseActionMenuTrigger<T extends object = any>({
  children,
}: Pick<MenuTriggerProps<T>, "children">) {
  return (
    <ResponsiveMenuTrigger
      placement="bottom right"
      renderDialogHeader={() => (
        <DialogHeader className="px-4 py-3">
          <DialogHeading className="text-base">Actions</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
      )}
      renderButton={() => (
        <Button
          aria-label="project menu"
          variant="ghost"
          iconLeft={
            <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="rounded-full"
        />
      )}
    >
      {children}
    </ResponsiveMenuTrigger>
  );
}
