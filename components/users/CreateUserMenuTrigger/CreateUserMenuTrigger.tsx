"use client";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { useCreateUser } from "../CreateUserContext";
import { BriefcaseBusiness, Users } from "lucide-react";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { CreateNewMenuTrigger } from "@/components/common/CreateNewMenuTrigger";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";
import { useCreatePositionModal } from "@/components/position/CreatePositionModal";

interface CreateUserMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CreateUserMenuTrigger({
  renderButton,
}: CreateUserMenuTriggerProps) {
  const t = useTranslations("users.CreateUserMenuTrigger");

  const { isOwner, isGuest } = useCurrentUser();

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Create position form modal state
  const { onOpenChange: onCreatePositionModalOpenChange } =
    useCreatePositionModal();

  // Create user form modal state
  const { onModalOpenChange: onUserModalOpenChange } = useCreateUser();

  /**
   * Handles menu actions for creating a user or position
   * - If user is a guest, show guest modal
   * - Otherwise, open create position modal or create user modal
   */
  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "user") {
        onUserModalOpenChange(true);
      } else if (key === "position") {
        onCreatePositionModalOpenChange(true);
      }
    });
  }

  // We show the user menu item only for owners and guests
  const showCreateNewUserMenuItem = isOwner || isGuest;

  return (
    <>
      <CreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        )}
        renderButton={renderButton}
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
      </CreateNewMenuTrigger>
    </>
  );
}
