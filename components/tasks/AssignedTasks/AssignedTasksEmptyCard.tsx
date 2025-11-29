import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionButton,
} from "@/components/common/EmptySection";
import { Card } from "@/components/common/Card";
import { useTranslations } from "next-intl";

export function AssignedTasksEmptyCard() {
  const t = useTranslations("tasks.AssignedTasksEmptyCard");

  return (
    <Card>
      <div className="flex items-center justify-center p-8 max-md:h-[17rem] md:h-[25rem]">
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            {t("heading")}
          </EmptySectionHeading>
          <EmptySectionDescription>{t("description")}</EmptySectionDescription>
          <EmptySectionButton href="#">{t("button")}</EmptySectionButton>
        </EmptySection>
      </div>
    </Card>
  );
}
