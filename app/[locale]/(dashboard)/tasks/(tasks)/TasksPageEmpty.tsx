import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";
import { PageContainer } from "@/components/common/PageContainer";

interface TasksPageEmptyProps {
  NewTaskFormContainer: React.ComponentType;
}

export function TasksPageEmpty({ NewTaskFormContainer }: TasksPageEmptyProps) {
  const t = useTranslations("app.TasksPageEmpty");

  return (
    <PageContainer fullscreen centered>
      <EmptySection>
        <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <EmptySectionButton
          createNewModal={
            <NewTaskModal newTaskForm={<NewTaskFormContainer />} />
          }
        >
          {t("addButtonLabel")}
        </EmptySectionButton>
      </EmptySection>
    </PageContainer>
  );
}
