"use client";

import {
  Button,
  Dialog,
  DialogHeader,
  RACDialogTrigger,
} from "@/components/ui";

import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

export function NotificationModalTrigger({
  notificationModalContentContainer,
}: {
  notificationModalContentContainer: React.ReactNode;
}) {
  const t = useTranslations("notifications.NotificationModalTrigger");

  return (
    <RACDialogTrigger>
      <Button
        data-test="notification-modal-trigger"
        aria-label={t("ariaLabel")}
        variant="ghost"
        iconLeft={<Bell size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className="rounded-full p-3"
      />

      <ResponsiveModal
        data-test="notification-modal"
        isDismissable
        className="w-[600px]"
      >
        <Dialog className="md:h-[calc(100dvh-64px)]">
          <DialogHeader>{t("dialogHeading")}</DialogHeader>

          {notificationModalContentContainer}
        </Dialog>
      </ResponsiveModal>
    </RACDialogTrigger>
  );
}
