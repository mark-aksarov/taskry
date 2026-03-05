import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { UserTasksEmptySectionButton } from "./UserTasksEmptySectionButton";

export function UserTasksEmptySection() {
  const t = useTranslations("users.UserTasksEmptySection");

  return (
    <div className="flex flex-auto items-center justify-center md:px-6">
      <EmptySection>
        <EmptySectionHeading className="text-3xl!">
          {t("heading")}
        </EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <UserTasksEmptySectionButton />
      </EmptySection>
    </div>
  );
}
