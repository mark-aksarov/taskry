import {
  DetailCard,
  DetailCardBody,
  DetailCardHeader,
} from "@/components/common/DetailCard";
import { DetailCardLeft } from "@/components/common/DetailCard/DetailCardLeft";
import { DetailCardRight } from "@/components/common/DetailCard/DetailCardRight";

interface TaskDetailCardProps {
  taskDetailCardHeading: React.ReactNode;
  taskDetail: React.ReactNode;
  taskDetailForm: React.ReactNode;
}

export function TaskDetailCard({
  taskDetailCardHeading,
  taskDetail,
  taskDetailForm,
}: TaskDetailCardProps) {
  return (
    <DetailCard data-test="task-detail-card">
      <DetailCardHeader>{taskDetailCardHeading}</DetailCardHeader>
      <DetailCardBody>
        <DetailCardLeft>{taskDetail}</DetailCardLeft>
        <DetailCardRight>{taskDetailForm}</DetailCardRight>
      </DetailCardBody>
    </DetailCard>
  );
}
