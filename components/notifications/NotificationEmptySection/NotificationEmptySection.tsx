import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";

export function NotificationEmptySection() {
  const t = useTranslations("notifications.NotificationEmptySection");

  return (
    <div
      data-test="notification-empty-section"
      className="flex min-h-[400px] flex-auto items-center justify-center"
    >
      <EmptySection className="max-w-[375px]">
        <EmptySectionHeading tag="h3" className="text-3xl!">
          {t("heading")}
        </EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
      </EmptySection>
    </div>
  );
}
