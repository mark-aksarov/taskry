import { ProjectDetailAltLayout } from "./ProjectDetailAltLayout";
import { DetailInfoAltSkeleton } from "@/dashboard/common/Detail";
import { ProjectTasksStatsDetailInfoAltSkeleton } from "./ProjectTasksStatsDetailInfoAlt";

export function ProjectDetailAltSkeleton() {
  return (
    <ProjectDetailAltLayout
      overdueSlot={null}
      titleSlot={<DetailInfoAltSkeleton surface />}
      descriptionSlot={<DetailInfoAltSkeleton surface />}
      statusSlot={<DetailInfoAltSkeleton surface />}
      deadlineSlot={<DetailInfoAltSkeleton surface />}
      clientSlot={<DetailInfoAltSkeleton surface />}
      categorySlot={<DetailInfoAltSkeleton surface />}
      progressSlot={<DetailInfoAltSkeleton surface />}
      creatorSlot={<DetailInfoAltSkeleton surface />}
      tasksStatsSlot={<ProjectTasksStatsDetailInfoAltSkeleton />}
    />
  );
}
