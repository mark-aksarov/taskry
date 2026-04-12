"use client";

import {
  UpdateUserAddressForm,
  UpdateUserAddressFormSubmitButton,
} from "../UpdateUserAddressForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
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
        <DialogBody>
          <UpdateUserAddressForm userId={userId} address={userAddress} />
        </DialogBody>
        <DialogFooter>
          <UpdateUserAddressFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
