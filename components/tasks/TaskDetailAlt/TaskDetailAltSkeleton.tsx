import { TaskDetailAltLayout } from "./TaskDetailAltLayout";
import { DetailInfoSkeleton } from "@/components/common/Detail";

export function TaskDetailAltSkeleton() {
  return (
    <TaskDetailAltLayout
      descriptionSlot={<DetailInfoSkeleton />}
      assigneesSlot={<DetailInfoSkeleton />}
      deadlineSlot={<DetailInfoSkeleton />}
      categoryNameSlot={<DetailInfoSkeleton />}
      statusSlot={<DetailInfoSkeleton />}
      projectTitleSlot={<DetailInfoSkeleton className="border-none pb-0" />}
      creatorSlot={<DetailInfoSkeleton className="border-none pb-0" />}
    />
  );
}
