import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { EditCompanyForm } from "../EditCompanyForm";
import { DialogHeader } from "@/components/ui/Dialog";
import { useUpdateCompany } from "../UpdateCompanyContext";

interface EditCompanyModalProps {
  companyId: number;
  companyName: string;
}

export function EditCompanyModal({
  companyId,
  companyName,
}: EditCompanyModalProps) {
  const t = useTranslations("company.EditCompanyModal");

  const { isModalOpen, onModalOpenChange } = useUpdateCompany();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <EditCompanyForm
            companyId={companyId}
            nameDefaultValue={companyName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
