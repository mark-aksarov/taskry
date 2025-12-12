import { Modal, Dialog, DialogBody } from "@/components/ui";

interface ConfirmModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onOpenChange: (isOpen: boolean) => void;
}

export function ConfirmModal({
  isOpen,
  onOpenChange,
  children,
}: ConfirmModalProps) {
  return (
    <Modal
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
