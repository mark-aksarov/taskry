"use client";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { useRole } from "@/common/RoleContext";
import { BriefcaseBusiness, Users } from "lucide-react";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { CreateNewMenuTrigger } from "@/dashboard/common/CreateNewMenuTrigger";

interface CreateUserMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CreateUserMenuTrigger({
  renderButton,
}: CreateUserMenuTriggerProps) {
  const t = useTranslations("dashboard.users.CreateUserMenuTrigger");

  const role = useRole();

  // Create position form modal state
  const { onOpenChange: onCreatePositionModalOpenChange } =
    useModal("createPosition");

  // Create user form modal state
  const { onOpenChange: onCreateUserModalOpenChange } = useModal("createUser");

  /**
   * Open create position modal or create user modal
   */
  function handleAction(key: Key) {
    if (key === "user") {
      onCreateUserModalOpenChange(true);
    } else if (key === "position") {
      onCreatePositionModalOpenChange(true);
    }
  }

  // We show the user menu item only for owners
  const showCreateCreateUserMenuItem = role === "owner";

  return (
    <>
      <CreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        )}
        renderButton={renderButton}
      >
        {showCreateCreateUserMenuItem ? (
          <Item textValue={t("items.user")} key="user">
            <Users />
            {t("items.user")}
          </Item>
        ) : null}
        <Item textValue={t("items.position")} key="position">
          <BriefcaseBusiness />
          {t("items.position")}
        </Item>
      </CreateNewMenuTrigger>
    </>
  );
}
