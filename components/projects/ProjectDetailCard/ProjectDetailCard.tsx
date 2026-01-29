import {
  DetailCard,
  DetailCardLeft,
  DetailCardTitle,
  DetailCardRight,
  DetailCardHeader,
} from "@/components/common/DetailCard";
import { useTranslations } from "next-intl";
import { ProjectDetailActions } from "../ProjectDetailActions";

interface ProjectDetailCardProps {
  projectDetailHeader: React.ReactNode;
  projectDetail: React.ReactNode;
}

export function ProjectDetailCard({
  projectDetailHeader,
  projectDetail,
}: ProjectDetailCardProps) {
  const t = useTranslations("projects.ProjectDetailCard");

  return (
    <DetailCard>
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>{t("title")}</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">{projectDetail}</div>
      </DetailCardLeft>

      <DetailCardRight>
        {projectDetailHeader}
        <ProjectDetailActions />
      </DetailCardRight>
    </DetailCard>
  );
}
