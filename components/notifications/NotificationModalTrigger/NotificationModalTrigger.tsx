import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import {
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
  RACDialogTrigger,
} from "@/components/ui";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";

export function NotificationModalTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("notifications.NotificationModalTrigger");

  return (
    <RACDialogTrigger>
      <Button
        aria-label={t("ariaLabel")}
        variant="ghost"
        iconLeft={<Bell size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className="rounded-full p-3"
      />

      <ResponsiveModal isDismissable className="w-[600px]">
        <Dialog className="md:max-h-[calc(100dvh-64px)]">
          <DialogHeader>
            <DialogHeading>{t("dialogHeading")}</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody className="p-0!">{children}</DialogBody>
        </Dialog>
      </ResponsiveModal>
    </RACDialogTrigger>
  );
}
