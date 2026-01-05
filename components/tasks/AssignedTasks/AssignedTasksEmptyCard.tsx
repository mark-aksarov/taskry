import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionButton,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { NewTaskModal } from "../NewTaskModal";
import { Card } from "@/components/common/Card";

interface AssignedTasksEmptyCardProps {
  NewTaskFormContainer: React.ComponentType;
}

export function AssignedTasksEmptyCard({
  NewTaskFormContainer,
}: AssignedTasksEmptyCardProps) {
  const t = useTranslations("tasks.AssignedTasksEmptyCard");

  return (
    <Card>
      <div className="flex items-center justify-center p-8 max-md:h-[17rem] md:h-[25rem]">
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            {t("heading")}
          </EmptySectionHeading>
          <EmptySectionDescription>{t("description")}</EmptySectionDescription>
          <EmptySectionButton
            createNewModal={
              <NewTaskModal newTaskForm={<NewTaskFormContainer />} />
            }
          >
            {t("button")}
          </EmptySectionButton>
        </EmptySection>
      </div>
    </Card>
  );
}
