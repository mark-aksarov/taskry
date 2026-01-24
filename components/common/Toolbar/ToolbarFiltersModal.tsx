import { ModalProps } from "@/components/ui/Modal";
import { ResponsiveModal } from "../ResponsiveModal";

export function ToolbarFiltersModal(props: ModalProps) {
  return <ResponsiveModal isDismissable className="md:w-[500px]" {...props} />;
}
