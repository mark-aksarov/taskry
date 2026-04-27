import { Modal, ModalProps } from "@/ui/Modal";
import { Dialog, DialogBody } from "@/ui/Dialog";
import { twMerge } from "tailwind-merge";

interface ConfirmModalProps extends Omit<ModalProps, "className"> {
  children: React.ReactNode;
  className?: string;
  "data-test"?: string;
}

export function ConfirmModal({
  children,
  className,
  ...props
}: ConfirmModalProps) {
  return (
    <Modal
      isDismissable
      className={twMerge(
        "w-[420px] max-w-[calc(100vw-var(--spacing)*8)]",
        className,
      )}
      {...props}
    >
      <Dialog>
        <DialogBody>{children}</DialogBody>
      </Dialog>
    </Modal>
  );
}
