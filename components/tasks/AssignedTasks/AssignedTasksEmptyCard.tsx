import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { AssignedTasksSectionButton } from "./AssignedTasksSectionButton";

export function AssignedTasksEmptyCard() {
  const t = useTranslations("tasks.AssignedTasksEmptyCard");

  return (
    <Card className="px-0">
      <div className="flex items-center justify-center max-md:h-[17rem] md:h-[25rem]">
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            {t("heading")}
          </EmptySectionHeading>
          <EmptySectionDescription>{t("description")}</EmptySectionDescription>
          <AssignedTasksSectionButton />
        </EmptySection>
      </div>
    </Card>
  );
}
