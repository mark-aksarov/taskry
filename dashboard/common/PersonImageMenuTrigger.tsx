"use client";

import { tv } from "tailwind-variants";
import { focusRing } from "@/ui/styles";
import { ButtonProps } from "@/ui/Button";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Camera, Trash } from "lucide-react";
import { Button } from "react-aria-components";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { ResponsiveMenuTrigger } from "@/dashboard/common/ResponsiveMenuTrigger";

const styles = tv({
  extend: focusRing,
  base: "cursor-pointer rounded-full",
  variants: {
    isDisabled: {
      true: "pointer-events-none",
    },
  },
});

interface PersonImageMenuTriggerProps extends ButtonProps {
  showDeleteMenuItem: boolean;
  onDelete: () => void;
  onUpdate: () => void;
  children: React.ReactNode;
}

export function PersonImageMenuTrigger({
  showDeleteMenuItem,
  onDelete,
  onUpdate,
  children,
  ...props
}: PersonImageMenuTriggerProps) {
  const t = useTranslations("dashboard.common.PersonImageMenuTrigger");

  function handleAction(key: Key) {
    if (key === "delete") {
      onDelete();
    } else if (key === "update") {
      onUpdate();
    }
  }

  return (
    <ResponsiveMenuTrigger
      onAction={handleAction}
      overlayClassName="md:min-w-[150px]"
      placement="bottom"
      renderDialogHeader={() => (
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
      )}
      renderButton={() => (
        <Button className={styles} {...props}>
          {children}
        </Button>
      )}
    >
      {showDeleteMenuItem ? (
        <Item textValue={t("items.delete")} key="delete">
          <Trash />
          {t("items.delete")}
        </Item>
      ) : null}
      <Item textValue={t("items.update")} key="update">
        <Camera />
        {t("items.update")}
      </Item>
    </ResponsiveMenuTrigger>
  );
}
