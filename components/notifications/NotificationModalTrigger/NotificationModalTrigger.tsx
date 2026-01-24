"use client";

import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Dialog, DialogHeader } from "@/components/ui/Dialog";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

export function NotificationModalTrigger({
  notificationModalContentContainer,
}: {
  notificationModalContentContainer: React.ReactNode;
}) {
  const t = useTranslations("notifications.NotificationModalTrigger");

  return (
    <DialogTrigger>
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
    </DialogTrigger>
  );
}
