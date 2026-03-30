"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdatePositionForm } from "../UpdatePositionForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdatePositionModalProps {
  positionId: number;
  positionName: string;
}

export function UpdatePositionModal({
  positionId,
  positionName,
}: UpdatePositionModalProps) {
  const t = useTranslations("positions.UpdatePositionModal");

  const { isOpen, onOpenChange } = useModal("updatePosition");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdatePositionForm
            positionId={positionId}
            nameDefaultValue={positionName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
