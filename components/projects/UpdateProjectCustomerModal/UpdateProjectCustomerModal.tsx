"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";
import { UpdateProjectCustomerFormSubmitButton } from "../UpdateProjectCustomerForm";

interface UpdateProjectCustomerModalProps {
  updateProjectCustomerFormContainer: React.ReactNode;
}

export function UpdateProjectCustomerModal({
  updateProjectCustomerFormContainer,
}: UpdateProjectCustomerModalProps) {
  const t = useTranslations("projects.UpdateProjectCustomerModal");

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
