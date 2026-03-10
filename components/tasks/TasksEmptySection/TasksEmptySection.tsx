import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { TasksEmptySectionCreateButton } from "./TasksEmptySectionCreateButton";

interface TasksEmptySectionProps {
  className?: string;
  headingClassName?: string;
}

export function TasksEmptySection({
  className,
  headingClassName,
}: TasksEmptySectionProps) {
  const t = useTranslations("tasks.TasksEmptySection");

  return (
    <EmptySection className={className}>
      <EmptySectionHeading className={headingClassName}>
        {t("heading")}
      </EmptySectionHeading>
      <EmptySectionDescription>{t("description")}</EmptySectionDescription>
      <TasksEmptySectionCreateButton />
    </EmptySection>
  );
}
