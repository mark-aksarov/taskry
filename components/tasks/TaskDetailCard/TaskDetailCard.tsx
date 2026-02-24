import {
  DetailCard,
  DetailCardLeft,
  DetailCardTitle,
  DetailCardRight,
  DetailCardHeader,
} from "@/components/common/DetailCard";
import { useTranslations } from "next-intl";

interface TaskDetailCardProps {
  taskDetailHeaderContainer: React.ReactNode;
  taskDetailContainer: React.ReactNode;
  taskDetailActions: React.ReactNode;
}

export function TaskDetailCard({
  taskDetailHeaderContainer,
  taskDetailContainer,
  taskDetailActions,
}: TaskDetailCardProps) {
  const t = useTranslations("tasks.TaskDetailCard");

  return (
    <DetailCard data-test="task-card">
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>{t("title")}</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">{taskDetailContainer}</div>
      </DetailCardLeft>

      <DetailCardRight>
        {taskDetailHeaderContainer}
        {taskDetailActions}
      </DetailCardRight>
    </DetailCard>
  );
}
