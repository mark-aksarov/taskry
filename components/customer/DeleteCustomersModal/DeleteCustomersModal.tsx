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
import { useDeleteCustomers } from "../DeleteCustomersContext";
import { handleDeleteEntities } from "@/lib/utils/handleDeleteEntities";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteCustomersModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCustomersModal({
  isOpen,
  onOpenChange,
}: DeleteCustomersModalProps) {
  const t = useTranslations("customers.DeleteCustomersModal");

  const selected = useSelectedItems();
  const { action, setIds: setDeleteCustomerIds } = useDeleteCustomers();
  const { clear: clearSelectedItems } = useSelectedItems();

  function handleDelete() {
    const payload = {
      ids: selected.ids,
      shouldRedirect: false,
    };

    handleDeleteEntities(
      selected.ids,
      action,
      payload,
      setDeleteCustomerIds,
      clearSelectedItems,
      onOpenChange,
    );
  }

  return (
    <ConfirmModal
      data-test="delete-customers-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: selected.ids.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-customers-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
