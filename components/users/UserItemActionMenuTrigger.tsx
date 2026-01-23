"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { DeleteUserModal } from "./DeleteUserModal";
import { ActionFn, ActionState, DeleteUsersPayload } from "@/lib/actions/types";

export function UserItemActionMenuTrigger({
  userId,
  userFullName,
  className,
  deleteAction,
}: {
  userId: string;
  userFullName: string;
  className?: string;
  deleteAction: ActionFn<ActionState, DeleteUsersPayload>;
}) {
  const t = useTranslations("users.UserItemActionMenuTrigger");
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  function handleAction(key: Key) {
    if (key === "delete") {
      setIsDeleteUserModalOpen(true);
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            className={className}
            data-test={`user-item-${userId}-action-menu-trigger`}
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

      <DeleteUserModal
        userId={userId}
        userFullName={userFullName}
        isOpen={isDeleteUserModalOpen}
        onOpenChange={setIsDeleteUserModalOpen}
        deleteAction={deleteAction}
      />
    </>
  );
}
