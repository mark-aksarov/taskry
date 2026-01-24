"use client";

import { useState } from "react";
import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { BriefcaseBusiness, Users } from "lucide-react";
import { ToolbarCreateNewButton } from "../common/Toolbar";
import { NewPositionModal } from "./NewPositionModal/NewPositionModal";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

interface UserToolbarCreateNewMenuTriggerProps {
  newUserForm: React.ReactNode;
  newPositionForm: React.ReactNode;
}

export function UserToolbarCreateNewMenuTrigger({
  newUserForm,
  newPositionForm,
}: UserToolbarCreateNewMenuTriggerProps) {
  const t = useTranslations("users.UserToolbarCreateNewMenuTrigger");

  // Separate modal state for creating an user and a position
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const [isOpenPositionModal, setIsOpenPositionModal] = useState(false);

  // Menu actions: show user modal, show position modal
  function handleAction(key: Key) {
    if (key === "user") {
      setIsOpenUserModal(true);
    } else if (key === "position") {
      setIsOpenPositionModal(true);
    }
  }

  return (
    <>
      <ResponsiveMenuTrigger
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
        <Item textValue={t("items.user")} key="user">
          <Users size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.user")}
        </Item>
        <Item textValue={t("items.position")} key="position">
          <BriefcaseBusiness size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.position")}
        </Item>
      </ResponsiveMenuTrigger>

      {/* Modal for creating a position */}
      <NewPositionModal
        newPositionForm={newPositionForm}
        isOpen={isOpenPositionModal}
        onOpenChange={setIsOpenPositionModal}
      />
    </>
  );
}
