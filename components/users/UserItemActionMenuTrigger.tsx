import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";
import { DeleteEntityModal } from "../common/DeleteEntityModal";
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
      <ItemBaseActionMenuTrigger className={className} onAction={handleAction}>
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <DeleteEntityModal
        entityId={userId}
        entityName={userFullName}
        translationNamespace="users.DeleteUserModal"
        isOpen={isDeleteUserModalOpen}
        onOpenChange={setIsDeleteUserModalOpen}
        deleteAction={deleteAction}
      />
    </>
  );
}
