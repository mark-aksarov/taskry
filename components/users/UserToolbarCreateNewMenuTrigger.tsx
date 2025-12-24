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
import { NewPositionModal } from "./NewCompanyModal/NewPositionModal";
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
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const [isOpenPositionModal, setIsOpenPositionModal] = useState(false);

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

      <NewPositionModal
        newPositionForm={newPositionForm}
        isOpen={isOpenPositionModal}
        onOpenChange={setIsOpenPositionModal}
      />
    </>
  );
}
