"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogHeading,
  RACDialogTrigger,
  DialogCloseButton,
} from "@/components/ui";
import { useContext } from "react";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { NotificationModalContentContainerContext } from "../NotificationModalContentContainer";

export function NotificationModalTrigger() {
  const t = useTranslations("notifications.NotificationModalTrigger");
  const NotificationModalContentContainer = useContext(
    NotificationModalContentContainerContext,
  );

  return (
    <RACDialogTrigger>
      <Button
        aria-label={t("ariaLabel")}
        variant="ghost"
        iconLeft={<Bell size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className="rounded-full p-3"
      />

      <ResponsiveModal isDismissable className="w-[600px]">
        <Dialog className="md:h-[calc(100dvh-64px)]">
          <DialogHeader>
            <DialogHeading>{t("dialogHeading")}</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>

          <NotificationModalContentContainer />
        </Dialog>
      </ResponsiveModal>
    </RACDialogTrigger>
  );
}
