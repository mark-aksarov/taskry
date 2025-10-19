import { DialogCloseButton, DialogHeader, DialogHeading } from "../ui";

export function MenuDialogHeader({ heading }: { heading: string }) {
  return (
    <DialogHeader className="px-4 py-3">
      <DialogHeading className="text-base">{heading}</DialogHeading>
      <DialogCloseButton />
    </DialogHeader>
  );
}
