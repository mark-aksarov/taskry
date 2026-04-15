import { Card } from "@/components/common/Card";
import {
  DetailCardHeader,
  DetailCardTitle,
} from "@/components/common/DetailCard";

interface ProjectDetailCardProps {
  projectDetailContainer: React.ReactNode;
}

export function ProjectDetailCard({
  projectDetailContainer,
}: ProjectDetailCardProps) {
  return (
    <Card className="mx-auto w-[700px] max-w-full p-0">
      <DetailCardHeader className="max-md:hidden">
        <DetailCardTitle>Детали проекта</DetailCardTitle>
      </DetailCardHeader>
      <div className="max-md:p-4 md:p-6">{projectDetailContainer}</div>
    </Card>
  );
}
