import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";
import { EditCompanyForm } from "../EditCompanyForm";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface EditCompanyModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  companyId: number;
  companyName: string;
  updateCompany: ActionFn<ActionState, FormData>;
}

export function EditCompanyModal({
  companyId,
  companyName,
  updateCompany,
  ...props
}: EditCompanyModalProps) {
  const t = useTranslations("company.EditCompanyModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <EditCompanyForm
            companyId={companyId}
            nameDefaultValue={companyName}
            updateCompany={updateCompany}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
