"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { EditPositionModal } from "../EditPositionModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { DeletePositionModal } from "../DeletePositionModal";
import { useCurrentUser } from "../../common/CurrentUserContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { usePositionListItemPending } from "./usePositionListItemPending";

export type PositionListItemActionMenuTriggerProps = {
  positionId: number;
  positionName: string;
  updatePosition: ActionFn<ActionState, FormData>;
  deletePosition: ActionFn<ActionState, number[]>;
};

export function PositionListItemActionMenuTrigger({
  positionId,
  positionName,
  updatePosition,
  deletePosition,
}: PositionListItemActionMenuTriggerProps) {
  const t = useTranslations("positions.PositionListItemActionMenuTrigger");

  // Deleting the position
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the position
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setIsEditModalOpen(true);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  //Pending state while deleting or updating
  const isPending = usePositionListItemPending(positionId);

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            isPending={isPending}
            data-test="position-item-action-menu-trigger"
            data-id={positionId}
          />
        )}
      >
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <EditPositionModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        positionId={positionId}
        positionName={positionName}
        updatePosition={updatePosition}
      />

      <DeletePositionModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        positionId={positionId}
        positionName={positionName}
        deletePosition={deletePosition}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
