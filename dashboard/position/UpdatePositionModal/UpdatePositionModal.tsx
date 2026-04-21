"use client";

import {
  UpdatePositionForm,
  UpdatePositionFormSubmitButton,
} from "../UpdatePositionForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdatePositionModalProps {
  positionId: number;
  positionName: string;
}

export function UpdatePositionModal({
  positionId,
  positionName,
}: UpdatePositionModalProps) {
  const t = useTranslations("dashboard.positions.UpdatePositionModal");

  const { isOpen, onOpenChange } = useModal("updatePosition");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdatePositionForm
            positionId={positionId}
            nameDefaultValue={positionName}
          />
        </DialogBody>
        <DialogFooter>
          <UpdatePositionFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
