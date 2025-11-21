import {
  DetailCard,
  DetailCardBody,
  DetailCardHeader,
} from "@/components/common/DetailCard";
import { DetailCardLeft } from "@/components/common/DetailCard/DetailCardLeft";
import { DetailCardRight } from "@/components/common/DetailCard/DetailCardRight";

interface ProjectDetailCardProps {
  projectDetailCardHeading: React.ReactNode;
  projectDetail: React.ReactNode;
  projectDetailForm: React.ReactNode;
}

export function ProjectDetailCard({
  projectDetailCardHeading,
  projectDetail,
  projectDetailForm,
}: ProjectDetailCardProps) {
  return (
    <DetailCard>
      <DetailCardHeader>{projectDetailCardHeading}</DetailCardHeader>
      <DetailCardBody>
        <DetailCardLeft>{projectDetail}</DetailCardLeft>
        <DetailCardRight>{projectDetailForm}</DetailCardRight>
      </DetailCardBody>
    </DetailCard>
  );
}
