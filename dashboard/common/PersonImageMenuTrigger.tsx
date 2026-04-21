"use client";

import { tv } from "tailwind-variants";
import { focusRing } from "@/ui/styles";
import { ButtonProps } from "@/ui/Button";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Camera, Trash } from "lucide-react";
import { Button } from "react-aria-components";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { ResponsiveMenuTrigger } from "@/dashboard/common/ResponsiveMenuTrigger";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

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

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "delete") {
        onDelete();
      } else if (key === "update") {
        onUpdate();
      }
    });
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
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.delete")}
        </Item>
      ) : null}
      <Item textValue={t("items.update")} key="update">
        <Camera size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("items.update")}
      </Item>
    </ResponsiveMenuTrigger>
  );
}
