import {
  FallbackSection,
  FallbackSectionHeading,
  FallbackSectionDescription,
} from "@/common/FallbackSection";
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
    <FallbackSection className={className}>
      <FallbackSectionHeading className={headingClassName}>
        {heading}
      </FallbackSectionHeading>

      <FallbackSectionDescription>
        {t("description")}
      </FallbackSectionDescription>

      <TasksEmptySectionCreateButton />
    </FallbackSection>
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
