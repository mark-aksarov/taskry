import {
  DetailCardAltHeader,
  DetailCardAltHeaderSkeleton,
} from "@/dashboard/common/DetailCardAlt";

import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectStatusBadge } from "../ProjectStatusBadge";
import { DeleteProjectModalTrigger } from "../DeleteProjectModalTrigger";

interface ProjectDetailCardHeaderProps {
  projectStatus: ProjectStatus;
}

export function ProjectDetailCardHeader({
  projectStatus,
}: ProjectDetailCardHeaderProps) {
  const t = useTranslations("dashboard.projects.ProjectDetailCard");

  return (
    <DetailCardAltHeader
      title={t("title")}
      statusSlot={
        <ProjectStatusBadge isPending={false} status={projectStatus} />
      }
      deleteButtonSlot={<DeleteProjectModalTrigger buttonVariant="primary" />}
    />
  );
}

export function ProjectDetailCardHeaderSkeleton() {
  const t = useTranslations("dashboard.projects.ProjectDetailCard");

  return <DetailCardAltHeaderSkeleton title={t("title")} />;
}
