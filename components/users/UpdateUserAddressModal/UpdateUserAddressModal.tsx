"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateUserAddressForm } from "../UpdateUserAddressForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserAddressModalProps {
  userId: string;
  userAddress?: string;
}

export function UpdateUserAddressModal({
  userId,
  userAddress,
}: UpdateUserAddressModalProps) {
  const t = useTranslations("users.UpdateUserAddressModal");

  const { isOpen, onOpenChange } = useModal("updateUserAddress");

  return (
    <FormBaseModal
      data-test="update-user-address-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateUserAddressForm userId={userId} address={userAddress} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
