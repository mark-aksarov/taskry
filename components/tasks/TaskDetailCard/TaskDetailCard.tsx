import {
  DetailCard,
  DetailCardLeft,
  DetailCardTitle,
  DetailCardRight,
  DetailCardHeader,
} from "@/components/common/DetailCard";
import { useTranslations } from "next-intl";
import { TaskDetailActions } from "../TaskDetailActions";

interface TaskDetailCardProps {
  taskDetailHeader: React.ReactNode;
  taskDetail: React.ReactNode;
}

export function TaskDetailCard({
  taskDetailHeader,
  taskDetail,
}: TaskDetailCardProps) {
  const t = useTranslations("tasks.TaskDetailCard");

  return (
    <DetailCard data-test="task-card">
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>{t("title")}</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">{taskDetail}</div>
      </DetailCardLeft>

      <DetailCardRight>
        {taskDetailHeader}
        <TaskDetailActions />
      </DetailCardRight>
    </DetailCard>
  );
}
