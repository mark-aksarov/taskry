import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseSubmitButton,
} from "@/components/common/FormBaseModal";

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
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{newPositionForm}</DialogBody>
        <DialogFooter>
          <FormBaseSubmitButton
            form="new-position-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
