"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteProjects } from "../DeleteProjectsContext";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { handleDeleteEntities } from "@/lib/utils/handleDeleteEntities";

interface DeleteProjectsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProjectsModal({
  isOpen,
  onOpenChange,
}: DeleteProjectsModalProps) {
  const t = useTranslations("projects.DeleteProjectsModal");

  const { ids: selectedIds, clear: clearSelectedItems } = useSelectedProjects();
  const { action, setIds: setDeleteCustomerIds } = useDeleteProjects();

  function handleDelete() {
    const payload = {
      ids: selectedIds,
      shouldRedirect: false,
    };

    handleDeleteEntities(
      selectedIds,
      action,
      payload,
      setDeleteCustomerIds,
      clearSelectedItems,
      onOpenChange,
    );
  }

  return (
    <ConfirmModal
      data-test="delete-projects-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: selectedIds.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-projects-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
