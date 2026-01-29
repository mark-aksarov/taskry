import { Modal, ModalProps } from "@/components/ui/Modal";

interface SubtaskFormModalProps extends ModalProps {
  "data-test"?: string;
}

export function SubtaskFormModal(props: SubtaskFormModalProps) {
  return <Modal isDismissable className="w-[300px]" {...props} />;
}
