import { useTranslations } from "next-intl";
import { DetailHeader } from "@/dashboard/common/DetailHeader";
import { ProjectDetailHeaderImage } from "./ProjectDetailHeaderImage";

interface ProjectDetailHeaderProps {
  projectTitle: string;
  categoryName?: string;
}

export function ProjectDetailHeader({
  projectTitle,
  categoryName,
}: ProjectDetailHeaderProps) {
  const t = useTranslations("dashboard.projects.ProjectDetailHeader");

  return (
    <DetailHeader
      title={projectTitle}
      imageSlot={<ProjectDetailHeaderImage />}
      subtitle={categoryName ? categoryName : t("noCategory")}
    />
  );
}
