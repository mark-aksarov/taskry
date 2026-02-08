import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

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
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>{newCompanyForm}</FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
