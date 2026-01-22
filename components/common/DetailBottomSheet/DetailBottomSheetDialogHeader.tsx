import {
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";

export function DetailBottomSheetDialogHeader({
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
