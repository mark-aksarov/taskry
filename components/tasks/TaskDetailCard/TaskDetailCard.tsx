import {
  DetailCard,
  DetailCardLeft,
  DetailCardTitle,
  DetailCardRight,
  DetailCardHeader,
} from "@/components/common/DetailCard";
import { useTranslations } from "next-intl";
import { TaskDetailActions } from "../TaskDetailActions";

interface UserDetailCardProps {
  taskDetailHeader: React.ReactNode;
  taskDetail: React.ReactNode;
}

export function TaskDetailCard({
  taskDetailHeader,
  taskDetail,
}: UserDetailCardProps) {
  const t = useTranslations("tasks.TaskDetailCard");

  return (
    <DetailCard>
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
