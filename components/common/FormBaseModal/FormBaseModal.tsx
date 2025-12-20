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
import { twMerge } from "tailwind-merge";

interface FormBaseModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  title: string;
  form: React.ReactNode;
  submitButtonLabel: string;
  className?: string;
}

export function FormBaseModal({
  title,
  form,
  submitButtonLabel,
  className,
  ...props
}: FormBaseModalProps) {
  return (
    <ResponsiveModal
      isDismissable
      className={twMerge("md:w-[500px]", className)}
      {...props}
    >
      <Dialog className="md:max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{title}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>{form}</DialogBody>
        <DialogFooter>
          <Button
            type="submit"
            form="new-project-form"
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
