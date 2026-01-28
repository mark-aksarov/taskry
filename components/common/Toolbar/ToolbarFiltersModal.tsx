import { ModalProps } from "@/components/ui/Modal";
import { ResponsiveModal } from "../ResponsiveModal";

interface ToolbarFiltersModalProps extends ModalProps {
  "data-test"?: string;
}

export function ToolbarFiltersModal(props: ToolbarFiltersModalProps) {
  return <ResponsiveModal isDismissable className="md:w-[500px]" {...props} />;
}
