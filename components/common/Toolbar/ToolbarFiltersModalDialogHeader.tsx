import {
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

export function ToolbarFiltersModalDialogHeader({
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
