import { ModalProps } from "@/components/ui/Modal";
import { SideSheet } from "@/components/ui/SideSheet";

interface DetailSideSheetProps extends ModalProps {
  "data-test"?: string;
}

export function DetailSideSheet(props: DetailSideSheetProps) {
  return <SideSheet isDismissable {...props} />;
}
