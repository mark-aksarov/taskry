import { useTranslations } from "next-intl";
import { DetailHeader } from "@/components/common/DetailHeader";
import { ProjectDetailHeaderImage } from "./ProjectDetailHeaderImage";

interface ProjectDetailHeaderProps {
  projectTitle: string;
  categoryName?: string;
}

export function ProjectDetailHeader({
  projectTitle,
  categoryName,
}: ProjectDetailHeaderProps) {
  const t = useTranslations("projects.ProjectDetailHeader");

  return (
    <DetailHeader
      title={projectTitle}
      image={<ProjectDetailHeaderImage />}
      subtitle={categoryName ? categoryName : t("noCategory")}
    />
  );
}
