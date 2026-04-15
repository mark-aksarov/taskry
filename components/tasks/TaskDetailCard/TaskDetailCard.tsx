import { Card } from "@/components/common/Card";
import {
  DetailCardHeader,
  DetailCardTitle,
} from "@/components/common/DetailCard";

interface TaskDetailCardProps {
  taskDetailContainer: React.ReactNode;
}

export function TaskDetailCard({ taskDetailContainer }: TaskDetailCardProps) {
  return (
    <Card className="mx-auto w-[700px] max-w-full p-0">
      <DetailCardHeader className="max-md:hidden">
        <DetailCardTitle>Детали задачи</DetailCardTitle>
      </DetailCardHeader>
      <div className="max-md:p-4 md:p-6">{taskDetailContainer}</div>
    </Card>
  );
}
