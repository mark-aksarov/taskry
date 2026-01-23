import {
  DialogBody,
  ModalProps,
  DialogFooter,
  DialogHeader,
} from "@/components/ui";

import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";

interface NewPositionModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newPositionForm: React.ReactNode;
}

export function NewPositionModal({
  newPositionForm,
  ...props
}: NewPositionModalProps) {
  const t = useTranslations("users.NewPositionModal");

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
