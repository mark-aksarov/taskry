import { ModalProps } from "@/components/ui/Modal";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

interface FormModalProps extends ModalProps {
  "data-test"?: string;
}

export function FormModal(props: FormModalProps) {
  return <ResponsiveModal isDismissable className="md:w-[500px]" {...props} />;
}
