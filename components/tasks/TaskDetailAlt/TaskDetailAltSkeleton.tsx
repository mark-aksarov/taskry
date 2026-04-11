import { TaskDetailAltLayout } from "./TaskDetailAltLayout";
import { DetailInfoSkeleton } from "@/components/common/Detail";

export function TaskDetailAltSkeleton() {
  return (
    <TaskDetailAltLayout
      titleSlot={<DetailInfoSkeleton />}
      descriptionSlot={<DetailInfoSkeleton />}
      assigneesSlot={<DetailInfoSkeleton />}
      deadlineSlot={<DetailInfoSkeleton />}
      categoryNameSlot={<DetailInfoSkeleton />}
      statusSlot={<DetailInfoSkeleton />}
      projectTitleSlot={<DetailInfoSkeleton />}
      creatorSlot={<DetailInfoSkeleton className="border-none pb-0" />}
    />
  );
}
