import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

interface NewCompanyModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newCompanyForm: React.ReactNode;
}

export function NewCompanyModal({
  newCompanyForm,
  ...props
}: NewCompanyModalProps) {
  const t = useTranslations("company.NewCompanyModal");

  return (
    <FormModal className="md:w-[350px]" {...props}>
      <FormModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{newCompanyForm}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="new-company-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
