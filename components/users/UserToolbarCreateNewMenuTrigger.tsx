"use client";

import {
  ToolbarCreateNewButton,
  ToolbarCreateNewMenuTrigger,
} from "../common/Toolbar";

import { useState } from "react";
import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { NewUserModal } from "./NewUserModal";
import { DialogHeader } from "@/components/ui/Dialog";
import { NewPositionModal } from "./NewPositionModal";
import { BriefcaseBusiness, Users } from "lucide-react";
import { GuestModeModal } from "../common/GuestModeModal";

interface UserToolbarCreateNewMenuTriggerProps {
  showUserMenuItem: boolean;
  guestMode: boolean;
  newUserForm: React.ReactNode;
  newPositionForm: React.ReactNode;
}

export function UserToolbarCreateNewMenuTrigger({
  showUserMenuItem,
  guestMode,
  newUserForm,
  newPositionForm,
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
          <ToolbarCreateNewButton
            data-test="user-toolbar-create-new-menu-trigger"
            label={t("label")}
          />
        )}
      >
        {showUserMenuItem ? (
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
        newUserForm={newUserForm}
        isOpen={isOpenUserModal}
        onOpenChange={setIsOpenUserModal}
      />

      {/* Modal for creating a position */}
      <NewPositionModal
        newPositionForm={newPositionForm}
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
