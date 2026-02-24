import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";
import { EditPositionForm } from "../EditPositionForm";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface EditPositionModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  positionId: number;
  positionName: string;
  updatePosition: ActionFn<ActionState, FormData>;
}

export function EditPositionModal({
  positionId,
  positionName,
  updatePosition,
  ...props
}: EditPositionModalProps) {
  const t = useTranslations("positions.EditPositionModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <EditPositionForm
            positionId={positionId}
            nameDefaultValue={positionName}
            updatePosition={updatePosition}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
