"use client";

import {
  Button,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Key, useOverlayTrigger } from "react-aria";
import { Item, useOverlayTriggerState } from "react-stately";
import { BriefcaseBusiness, Plus, Users } from "lucide-react";
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

  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openPositionModal, setOpenPositionModal] = useState(false);

  function handleAction(key: Key) {
    if (key === "user") {
      setOpenUserModal(true);
    } else if (key === "position") {
      setOpenPositionModal(true);
    }
  }

  return (
    <>
      <ResponsiveMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>
            <DialogHeading>{t("dialogHeading")}</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
        )}
        overlayClassName="md:min-w-[200px]"
        renderButton={() => (
          <Button
            {...triggerProps}
            label={t("triggerLabel")}
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        )}
        placement="bottom right"
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

      {/* render modals*/}
    </>
  );
}
