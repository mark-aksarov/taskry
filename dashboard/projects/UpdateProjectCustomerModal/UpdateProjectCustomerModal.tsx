"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { UpdateProjectCustomerFormSubmitButton } from "../UpdateProjectCustomerForm";

interface UpdateProjectCustomerModalProps {
  updateProjectCustomerFormContainer: React.ReactNode;
}

export function UpdateProjectCustomerModal({
  updateProjectCustomerFormContainer,
}: UpdateProjectCustomerModalProps) {
  const t = useTranslations("dashboard.projects.UpdateProjectCustomerModal");

  const { isOpen, onOpenChange } = useModal("updateProjectCustomer");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      data-test="update-project-customer-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateProjectCustomerFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateProjectCustomerFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
