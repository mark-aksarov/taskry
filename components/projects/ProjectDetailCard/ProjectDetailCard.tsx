import {
  DetailCardHeader,
  DetailCardTitle,
} from "@/components/common/DetailCard";
import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";

interface ProjectDetailCardProps {
  projectDetailContainer: React.ReactNode;
}

export function ProjectDetailCard({
  projectDetailContainer,
}: ProjectDetailCardProps) {
  const t = useTranslations("projects.ProjectDetailCard");

  return (
    <Card className="mx-auto w-[700px] max-w-full p-0">
      <DetailCardHeader className="max-md:hidden">
        <DetailCardTitle>{t("title")}</DetailCardTitle>
      </DetailCardHeader>
      <div className="max-md:p-4 md:p-6">{projectDetailContainer}</div>
    </Card>
  );
}
