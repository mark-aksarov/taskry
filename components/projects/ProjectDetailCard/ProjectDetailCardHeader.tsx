import {
  DetailCardAltHeader,
  DetailCardAltHeaderSkeleton,
} from "@/components/common/DetailCardAlt";

import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectStatusBadge } from "../ProjectStatusBadge";
import { DeleteProjectModalTrigger } from "../DeleteProjectModalTrigger";

interface ProjectDetailCardHeaderProps {
  projectStatus: ProjectStatus;
  projectDeadline: string;
}

export function ProjectDetailCardHeader({
  projectStatus,
  projectDeadline,
}: ProjectDetailCardHeaderProps) {
  const t = useTranslations("projects.ProjectDetailCard");

  return (
    <DetailCardAltHeader
      title={t("title")}
      statusSlot={
        <ProjectStatusBadge
          isPending={false}
          status={projectStatus}
          deadline={projectDeadline}
        />
      }
      deadline={projectDeadline}
      deleteButtonSlot={<DeleteProjectModalTrigger />}
    />
  );
}

export function ProjectDetailCardHeaderSkeleton() {
  const t = useTranslations("projects.ProjectDetailCard");

  return <DetailCardAltHeaderSkeleton title={t("title")} />;
}
