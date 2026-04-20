import { ModalProps } from "@/ui/Modal";
import { SideSheet } from "@/ui/SideSheet";

interface DetailSideSheetProps extends ModalProps {
  "data-test"?: string;
}

export function DetailSideSheet(props: DetailSideSheetProps) {
  return <SideSheet isDismissable {...props} />;
}
