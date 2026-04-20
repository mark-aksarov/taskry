import { ModalProps } from "@/ui/Modal";
import { ResponsiveModal } from "@/dashboard/common/ResponsiveModal";

export interface FormBaseModalProps extends ModalProps {
  "data-test"?: string;
}

export function FormBaseModal(props: FormBaseModalProps) {
  return <ResponsiveModal isDismissable className="md:w-[500px]" {...props} />;
}
