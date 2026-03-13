"use client";

import { tv } from "tailwind-variants";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Camera, Trash } from "lucide-react";
import { Button } from "react-aria-components";
import { focusRing } from "@/components/ui/styles";
import { ButtonProps } from "@/components/ui/Button";
import { DialogHeader } from "@/components/ui/Dialog";
import { ResponsiveMenuTrigger } from "./ResponsiveMenuTrigger";

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
  onDelete: () => void;
  onUpdate: () => void;
  children: React.ReactNode;
}

export function PersonImageMenuTrigger({
  onDelete,
  onUpdate,
  children,
  ...props
}: PersonImageMenuTriggerProps) {
  const t = useTranslations("common.PersonImageMenuTrigger");

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
      renderDialogHeader={() => <DialogHeader>{t("heading")}</DialogHeader>}
      renderButton={() => (
        <Button className={styles} {...props}>
          {children}
        </Button>
      )}
    >
      <Item textValue={t("items.delete")} key="delete">
        <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("items.delete")}
      </Item>
      <Item textValue={t("items.update")} key="update">
        <Camera size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("items.update")}
      </Item>
    </ResponsiveMenuTrigger>
  );
}
