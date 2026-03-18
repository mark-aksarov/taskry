import { DialogCloseButton, DialogHeader, DialogHeading } from "../ui/Dialog";

interface DialogHeaderWithCloseProps {
  className?: string;
  children: React.ReactNode;
}

export const DialogHeaderWithClose = ({
  className,
  children,
}: DialogHeaderWithCloseProps) => {
  return (
    <DialogHeader className={className}>
      <DialogHeading>{children}</DialogHeading>
      <DialogCloseButton />
    </DialogHeader>
  );
};
