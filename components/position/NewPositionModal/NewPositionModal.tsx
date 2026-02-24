import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";
import { NewPositionForm } from "../NewPositionForm";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface NewPositionModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  createPosition: ActionFn<ActionState, FormData>;
}

export function NewPositionModal({
  createPosition,
  ...props
}: NewPositionModalProps) {
  const t = useTranslations("positions.NewPositionModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewPositionForm createPosition={createPosition} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
