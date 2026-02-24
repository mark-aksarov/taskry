"use client";

import {
  ToolbarCreateNewModalTrigger,
  ToolbarCreateNewMenuTrigger,
} from "../common/Toolbar";

import { useState } from "react";
import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { NewUserModal } from "./NewUserModal";
import { DialogHeader } from "@/components/ui/Dialog";
import { BriefcaseBusiness, Users } from "lucide-react";
import { GuestModeModal } from "../common/GuestModeModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { NewPositionModal } from "../position/NewPositionModal";

interface UserToolbarCreateNewMenuTriggerProps {
  showCreateNewUserMenuItem: boolean;
  guestMode: boolean;
  createUser: ActionFn<ActionState, FormData>;
  createPosition: ActionFn<ActionState, FormData>;
}

export function UserToolbarCreateNewMenuTrigger({
  showCreateNewUserMenuItem,
  guestMode,
  createUser,
  createPosition,
}: UserToolbarCreateNewMenuTriggerProps) {
  const t = useTranslations("users.UserToolbarCreateNewMenuTrigger");

  // Separate modal state for creating an user and a position
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const [isOpenPositionModal, setIsOpenPositionModal] = useState(false);

  // Guest mode
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Menu actions: show guest modal, show user modal, show position modal
  function handleAction(key: Key) {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "user") {
      setIsOpenUserModal(true);
    } else if (key === "position") {
      setIsOpenPositionModal(true);
    }
  }

  return (
    <>
      <ToolbarCreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <ToolbarCreateNewModalTrigger
            data-test="user-toolbar-create-new-menu-trigger"
            label={t("label")}
          />
        )}
      >
        {showCreateNewUserMenuItem ? (
          <Item textValue={t("items.user")} key="user">
            <Users size={16} strokeWidth={1.5} absoluteStrokeWidth />
            {t("items.user")}
          </Item>
        ) : null}
        <Item textValue={t("items.position")} key="position">
          <BriefcaseBusiness size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.position")}
        </Item>
      </ToolbarCreateNewMenuTrigger>

      {/* Modal for creating a user */}
      <NewUserModal
        createUser={createUser}
        isOpen={isOpenUserModal}
        onOpenChange={setIsOpenUserModal}
      />

      {/* Modal for creating a position */}
      <NewPositionModal
        createPosition={createPosition}
        isOpen={isOpenPositionModal}
        onOpenChange={setIsOpenPositionModal}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
