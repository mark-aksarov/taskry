import {
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

export function ToolbarActionsMenuDialogHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DialogHeader>
      <DialogHeading>{children}</DialogHeading>
      <DialogCloseButton />
    </DialogHeader>
  );
}
