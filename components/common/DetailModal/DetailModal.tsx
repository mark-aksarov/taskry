import { ModalProps } from "@/components/ui/Modal";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

interface DetailModalProps extends ModalProps {
  "data-test"?: string;
}

export function DetailModal(props: DetailModalProps) {
  return <ResponsiveModal isDismissable className="md:w-[600px]" {...props} />;
}
