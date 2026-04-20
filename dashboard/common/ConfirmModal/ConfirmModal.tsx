import { Modal, ModalProps } from "@/ui/Modal";
import { Dialog, DialogBody } from "@/ui/Dialog";

interface ConfirmModalProps extends ModalProps {
  children: React.ReactNode;
  "data-test"?: string;
}

export function ConfirmModal({ children, ...props }: ConfirmModalProps) {
  return (
    <Modal
      isDismissable
      className="w-[420px] max-w-[calc(100vw-var(--spacing)*8)]"
      {...props}
    >
      <Dialog>
        <DialogBody>{children}</DialogBody>
      </Dialog>
    </Modal>
  );
}
