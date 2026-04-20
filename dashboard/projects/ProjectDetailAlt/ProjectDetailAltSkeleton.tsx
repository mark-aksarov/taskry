import { ProjectDetailAltLayout } from "./ProjectDetailAltLayout";
import { DetailInfoAltSkeleton } from "@/dashboard/common/Detail";
import { ProjectTasksStatsDetailInfoAltSkeleton } from "./ProjectTasksStatsDetailInfoAlt";

export function ProjectDetailAltSkeleton() {
  return (
    <ProjectDetailAltLayout
      titleSlot={<DetailInfoAltSkeleton surface />}
      descriptionSlot={<DetailInfoAltSkeleton surface />}
      statusSlot={<DetailInfoAltSkeleton surface />}
      deadlineSlot={<DetailInfoAltSkeleton surface />}
      customerSlot={<DetailInfoAltSkeleton surface />}
      categorySlot={<DetailInfoAltSkeleton surface />}
      progressSlot={<DetailInfoAltSkeleton surface />}
      creatorSlot={<DetailInfoAltSkeleton surface />}
      tasksStatsSlot={<ProjectTasksStatsDetailInfoAltSkeleton />}
    />
  );
}
