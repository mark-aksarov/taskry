import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";

interface UserTasksEmptySectionProps {
  NewTaskFormContainer: React.ComponentType;
}

export function UserTasksEmptySection({
  NewTaskFormContainer,
}: UserTasksEmptySectionProps) {
  const t = useTranslations("users.UserTasksEmptySection");

  return (
    <div className="flex flex-auto items-center justify-center">
      <EmptySection>
        <EmptySectionHeading className="text-3xl!">
          {t("heading")}
        </EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <EmptySectionButton
          createNewModal={
            <NewTaskModal newTaskForm={<NewTaskFormContainer />} />
          }
        >
          {t("editButtonLabel")}
        </EmptySectionButton>
      </EmptySection>
    </div>
  );
}
