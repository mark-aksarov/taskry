import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateCompanyForm } from "../UpdateCompanyForm";
import { useUpdateCompanyModal } from "./UpdateCompanyModalContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface EditCompanyModalProps {
  companyId: number;
  companyName: string;
}

export function UpdateCompanyModal({
  companyId,
  companyName,
}: EditCompanyModalProps) {
  const t = useTranslations("company.UpdateCompanyModal");

  const { isOpen, onOpenChange } = useUpdateCompanyModal();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateCompanyForm
            companyId={companyId}
            nameDefaultValue={companyName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
