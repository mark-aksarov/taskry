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

interface NewCompanyModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newCompanyForm: React.ReactNode;
}

export function NewCompanyModal({
  newCompanyForm,
  ...props
}: NewCompanyModalProps) {
  const t = useTranslations("customers.NewCompanyModal");

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
