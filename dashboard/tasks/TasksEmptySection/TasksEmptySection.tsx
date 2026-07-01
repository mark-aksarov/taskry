import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/dashboard/common/EmptySection";
import { useTranslations } from "next-intl";
import { TasksEmptySectionCreateButton } from "./TasksEmptySectionCreateButton";

interface TasksEmptySectionProps {
  className?: string;
  headingClassName?: string;
}

type TasksEmptySectionBaseProps = TasksEmptySectionProps & {
  heading: React.ReactNode;
};

function TasksEmptySectionBase({
  className,
  headingClassName,
  heading,
}: TasksEmptySectionBaseProps) {
  const t = useTranslations("dashboard.tasks.TasksEmptySectionBase");

  return (
    <EmptySection className={className}>
      <EmptySectionHeading className={headingClassName}>
        {heading}
      </EmptySectionHeading>

      <EmptySectionDescription>{t("description")}</EmptySectionDescription>

      <TasksEmptySectionCreateButton />
    </EmptySection>
  );
}

export function TasksEmptySection(props: TasksEmptySectionProps) {
  const t = useTranslations("dashboard.tasks.TasksEmptySection");

  return <TasksEmptySectionBase {...props} heading={t("heading")} />;
}

export function AssignedTasksEmptySection(props: TasksEmptySectionProps) {
  const t = useTranslations("dashboard.tasks.AssignedTasksEmptySection");

  return <TasksEmptySectionBase {...props} heading={t("heading")} />;
}
