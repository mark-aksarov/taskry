import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

interface NewPositionModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newPositionForm: React.ReactNode;
}

export function NewPositionModal({
  newPositionForm,
  ...props
}: NewPositionModalProps) {
  const t = useTranslations("positions.NewPositionModal");

  return (
    <FormModal className="md:w-[350px]" {...props}>
      <FormModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{newPositionForm}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="new-position-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
