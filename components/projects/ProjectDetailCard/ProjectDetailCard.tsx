import {
  DetailCard,
  DetailCardLeft,
  DetailCardTitle,
  DetailCardRight,
  DetailCardHeader,
} from "@/components/common/DetailCard";
import { useTranslations } from "next-intl";

interface ProjectDetailCardProps {
  projectDetailHeader: React.ReactNode;
  projectDetail: React.ReactNode;
  projectDetailActions: React.ReactNode;
}

export function ProjectDetailCard({
  projectDetailHeader,
  projectDetail,
  projectDetailActions,
}: ProjectDetailCardProps) {
  const t = useTranslations("projects.ProjectDetailCard");

  return (
    <DetailCard data-test="project-card">
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>{t("title")}</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">{projectDetail}</div>
      </DetailCardLeft>

      <DetailCardRight>
        {projectDetailHeader}
        {projectDetailActions}
      </DetailCardRight>
    </DetailCard>
  );
}
