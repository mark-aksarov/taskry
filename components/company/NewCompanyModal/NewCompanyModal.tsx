import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { NewCompanyForm } from "../NewCompanyForm";
import { DialogHeader } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface NewCompanyModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  createCompany: ActionFn<ActionState, FormData>;
}

export function NewCompanyModal({
  createCompany,
  ...props
}: NewCompanyModalProps) {
  const t = useTranslations("company.NewCompanyModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewCompanyForm createCompany={createCompany} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
