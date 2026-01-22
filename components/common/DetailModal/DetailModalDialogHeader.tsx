import {
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

export function DetailModalDialogHeader({
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
