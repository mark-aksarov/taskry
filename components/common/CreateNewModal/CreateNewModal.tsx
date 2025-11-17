import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import {
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  ModalProps,
} from "@/components/ui";

interface CreateNewModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  title: string;
  form: React.ReactNode;
  submitButtonLabel: string;
}

export function CreateNewModal({
  title,
  form,
  submitButtonLabel,
  ...props
}: CreateNewModalProps) {
  return (
    <ResponsiveModal isDismissable className="w-[460px]" {...props}>
      <Dialog className="md:max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{title}</DialogHeading>
          <DialogCloseButton iconSize={20} />
        </DialogHeader>
        <DialogBody>{form}</DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label={submitButtonLabel}
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </ResponsiveModal>
  );
}
