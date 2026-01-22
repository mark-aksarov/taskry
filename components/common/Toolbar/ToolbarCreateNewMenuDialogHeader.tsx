import {
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

export function ToolbarCreateNewMenuDialogHeader({
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
