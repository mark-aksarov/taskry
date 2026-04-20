import { TaskDetailAltLayout } from "./TaskDetailAltLayout";
import { DetailInfoAltSkeleton } from "@/dashboard/common/Detail";

export function TaskDetailAltSkeleton() {
  return (
    <TaskDetailAltLayout
      titleSlot={<DetailInfoAltSkeleton surface />}
      descriptionSlot={<DetailInfoAltSkeleton surface />}
      assigneesSlot={<DetailInfoAltSkeleton surface />}
      deadlineSlot={<DetailInfoAltSkeleton surface />}
      categoryNameSlot={<DetailInfoAltSkeleton surface />}
      statusSlot={<DetailInfoAltSkeleton surface />}
      projectTitleSlot={<DetailInfoAltSkeleton surface />}
      creatorSlot={<DetailInfoAltSkeleton surface />}
      progressSlot={<DetailInfoAltSkeleton surface />}
      subtasksSlot={<DetailInfoAltSkeleton surface />}
    />
  );
}
