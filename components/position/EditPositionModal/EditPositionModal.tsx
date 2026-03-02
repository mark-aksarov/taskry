import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { EditPositionForm } from "../EditPositionForm";

interface EditPositionModalProps {
  positionId: number;
  positionName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditPositionModal({
  positionId,
  positionName,
  isOpen,
  onOpenChange,
}: EditPositionModalProps) {
  const t = useTranslations("positions.EditPositionModal");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
