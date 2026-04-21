import { ModalProps } from "@/ui/Modal";
import { ResponsiveModal } from "@/dashboard/common/ResponsiveModal";

export function CommentsModal(props: ModalProps) {
  return <ResponsiveModal isDismissable className="md:w-[600px]" {...props} />;
}
