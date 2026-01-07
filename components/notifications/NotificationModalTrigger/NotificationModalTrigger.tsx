"use client";

import {
  Button,
  Dialog,
  Skeleton,
  DialogBody,
  DialogHeader,
  DialogHeading,
  RACDialogTrigger,
  DialogCloseButton,
} from "@/components/ui";

import { Suspense } from "react";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { Repeat } from "@/components/common/Repeat";
import { NotificationList } from "../NotificationList";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { NotificationListItemSkeleton } from "../NotificationListItem";
import { NotificationModalContent } from "../NotificationModalContent";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

export function NotificationModalTrigger() {
  const t = useTranslations("notifications.NotificationModalTrigger");

  const { NotificationModalContentContainer } = useGlobalContainer();

  if (!NotificationModalContentContainer) {
    throw new Error(
      "NotificationModalContentContainer is missing in GlobalContainerContext",
    );
  }

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
          <DialogHeader>
            <DialogHeading>{t("dialogHeading")}</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>

          <Suspense
            fallback={
              <DialogBody className="p-0!">
                <NotificationModalContent>
                  <div className="flex gap-4">
                    <Skeleton className="h-8 w-[5rem] rounded-lg" />
                    <Skeleton className="h-8 w-[5rem] rounded-lg" />
                  </div>
                  <NotificationList>
                    <Repeat
                      items={10}
                      renderItem={() => <NotificationListItemSkeleton />}
                    />
                  </NotificationList>
                </NotificationModalContent>
              </DialogBody>
            }
          >
            <NotificationModalContentContainer />
          </Suspense>
        </Dialog>
      </ResponsiveModal>
    </RACDialogTrigger>
  );
}
