import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

interface EditPositionModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  editPositionForm: React.ReactNode;
}

export function EditPositionModal({
  editPositionForm,
  ...props
}: EditPositionModalProps) {
  const t = useTranslations("positions.EditPositionModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>{editPositionForm}</FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
