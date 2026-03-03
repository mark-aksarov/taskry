"use client";

import {
  ToolbarCreateNewModalTrigger,
  ToolbarCreateNewMenuTrigger,
} from "../common/Toolbar";

import { useState } from "react";
import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { useCreateUser } from "./CreateUserContext";
import { DialogHeader } from "@/components/ui/Dialog";
import { BriefcaseBusiness, Users } from "lucide-react";
import { GuestModeModal } from "../common/GuestModeModal";
import { useCurrentUser } from "../common/CurrentUserContext";
import { useCreatePosition } from "../position/CreatePositionContext";

export function UserToolbarCreateNewMenuTrigger() {
  const t = useTranslations("users.UserToolbarCreateNewMenuTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isOwner, isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Create position: action state + form modal state
  const {
    isPending: isCreatePositionPending,
    onModalOpenChange: onPositionModalOpenChange,
  } = useCreatePosition();

  // Create user: action state + form modal state
  const {
    isPending: isCreateUserPending,
    onModalOpenChange: onUserModalOpenChange,
  } = useCreateUser();

  /**
   * Handles menu actions for creating a user or position
   * - If user is a guest, show guest modal
   * - Otherwise, open create position modal or create user modal
   */
  function handleAction(key: Key) {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "user") {
      onUserModalOpenChange(true);
    } else if (key === "position") {
      onPositionModalOpenChange(true);
    }
  }

  // We show the user menu item only for owners and guests
  const showCreateNewUserMenuItem = isOwner || isGuest;

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
            isDisabled={
              // Block user interactions while a position or user is being created
              isCreatePositionPending || isCreateUserPending
            }
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

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
