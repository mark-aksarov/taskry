import { ModalProps } from "@/components/ui";
import { ResponsiveModal } from "../ResponsiveModal";

export function ToolbarFiltersModal(props: ModalProps) {
  return (
    <ResponsiveModal
      data-test="toolbar-filters-modal"
      isDismissable
      className="w-[500px]"
      {...props}
    />
  );
}
