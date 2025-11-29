import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";

export function UserTasksEmptySection() {
  const t = useTranslations("users.UserTasksEmptySection");

  return (
    <div className="flex flex-auto items-center justify-center">
      <EmptySection>
        <EmptySectionHeading className="text-3xl!">
          {t("heading")}
        </EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <EmptySectionButton href="/users/edit">
          {t("editButtonLabel")}
        </EmptySectionButton>
      </EmptySection>
    </div>
  );
}
