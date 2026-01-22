import { ModalProps } from "@/components/ui";

import { ResponsiveModal } from "@/components/common/ResponsiveModal";

export function DetailModal(props: ModalProps) {
  return <ResponsiveModal isDismissable className="md:w-[600px]" {...props} />;
}
