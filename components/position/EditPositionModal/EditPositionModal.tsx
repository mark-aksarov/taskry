import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { EditPositionForm } from "../EditPositionForm";
import { useUpdatePosition } from "../UpdatePositionContext";

interface EditPositionModalProps {
  positionId: number;
  positionName: string;
}

export function EditPositionModal({
  positionId,
  positionName,
}: EditPositionModalProps) {
  const t = useTranslations("positions.EditPositionModal");

  const { isModalOpen, onModalOpenChange } = useUpdatePosition();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <EditPositionForm
            positionId={positionId}
            nameDefaultValue={positionName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
