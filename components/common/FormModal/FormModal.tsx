import { ModalProps } from "@/components/ui/Modal";

import { ResponsiveModal } from "@/components/common/ResponsiveModal";

export function FormModal(props: ModalProps) {
  return <ResponsiveModal isDismissable className="md:w-[500px]" {...props} />;
}
