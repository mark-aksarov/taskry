import { DetailCardAlt } from "@/components/common/DetailCardAlt";

interface TaskDetailCardProps {
  taskDetailCardHeaderContainer: React.ReactNode;
  taskDetailContainer: React.ReactNode;
}

export function TaskDetailCard({
  taskDetailCardHeaderContainer,
  taskDetailContainer,
}: TaskDetailCardProps) {
  return (
    <DetailCardAlt
      detailCardHeaderContainer={taskDetailCardHeaderContainer}
      entityDetailContainer={taskDetailContainer}
    />
  );
}
