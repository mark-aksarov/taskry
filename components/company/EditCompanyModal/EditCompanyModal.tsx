import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { EditCompanyForm } from "../EditCompanyForm";

interface EditCompanyModalProps {
  companyId: number;
  companyName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCompanyModal({
  companyId,
  companyName,
  isOpen,
  onOpenChange,
}: EditCompanyModalProps) {
  const t = useTranslations("company.EditCompanyModal");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
