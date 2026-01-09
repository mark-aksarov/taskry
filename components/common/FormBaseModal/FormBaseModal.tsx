import {
  Button,
  Dialog,
  ModalProps,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

import { twMerge } from "tailwind-merge";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

interface FormBaseModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  formId: string;
  title: string;
  form: React.ReactNode;
  submitButtonLabel: string;
  className?: string;
}

export function FormBaseModal({
  formId,
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
            form={formId}
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
