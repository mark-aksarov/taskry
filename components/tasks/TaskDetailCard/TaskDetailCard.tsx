import {
  DetailCard,
  DetailCardBody,
  DetailCardHeader,
  DetailCardHeading,
} from "@/components/common/DetailCard";

export function TaskDetailCard({
  taskDetail,
}: {
  taskDetail: React.ReactNode;
}) {
  return (
    <DetailCard>
      <DetailCardHeader>
        <DetailCardHeading>Task Details</DetailCardHeading>
      </DetailCardHeader>
      <DetailCardBody>{taskDetail}</DetailCardBody>
    </DetailCard>
  );
}
