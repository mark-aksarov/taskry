import { Modal, Dialog, DialogBody, ModalProps } from "@/components/ui";

interface ConfirmModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  "data-test"?: string;
  children: React.ReactNode;
}

export function ConfirmModal({
  "data-test": dataTest,
  isOpen,
  onOpenChange,
  children,
}: ConfirmModalProps) {
  return (
    <Modal
      data-test={dataTest}
      isDismissable
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="w-[420px] max-w-[calc(100vw-var(--spacing)*8)]"
    >
      <Dialog>
        <DialogBody>{children}</DialogBody>
      </Dialog>
    </Modal>
  );
}
