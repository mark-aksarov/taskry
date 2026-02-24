import {
  DetailCard,
  DetailCardLeft,
  DetailCardTitle,
  DetailCardRight,
  DetailCardHeader,
} from "@/components/common/DetailCard";
import { useTranslations } from "next-intl";

interface ProjectDetailCardProps {
  projectDetailHeaderContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
  projectDetailActions: React.ReactNode;
}

export function ProjectDetailCard({
  projectDetailHeaderContainer,
  projectDetailContainer,
  projectDetailActions,
}: ProjectDetailCardProps) {
  const t = useTranslations("projects.ProjectDetailCard");

  return (
    <DetailCard data-test="project-card">
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>{t("title")}</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">{projectDetailContainer}</div>
      </DetailCardLeft>

      <DetailCardRight>
        {projectDetailHeaderContainer}
        {projectDetailActions}
      </DetailCardRight>
    </DetailCard>
  );
}
