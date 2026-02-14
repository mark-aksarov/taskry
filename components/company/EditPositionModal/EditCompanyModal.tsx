import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

interface EditCompanyModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  editCompanyForm: React.ReactNode;
}

export function EditCompanyModal({
  editCompanyForm,
  ...props
}: EditCompanyModalProps) {
  const t = useTranslations("company.EditCompanyModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>{editCompanyForm}</FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
