import {
  DetailCardHeader,
  DetailCardTitle,
} from "@/components/common/DetailCard";
import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";

interface TaskDetailCardProps {
  taskDetailContainer: React.ReactNode;
}

export function TaskDetailCard({ taskDetailContainer }: TaskDetailCardProps) {
  const t = useTranslations("tasks.TaskDetailCard");

  return (
    <Card className="mx-auto w-[700px] max-w-full p-0">
      <DetailCardHeader className="max-md:hidden">
        <DetailCardTitle>{t("title")}</DetailCardTitle>
      </DetailCardHeader>
      <div className="max-md:p-4 md:p-6">{taskDetailContainer}</div>
    </Card>
  );
}
