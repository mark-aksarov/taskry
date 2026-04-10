import { ProjectDetailAltLayout } from "./ProjectDetailAltLayout";
import { DetailInfoSkeleton } from "@/components/common/Detail";

export function ProjectDetailAltSkeleton() {
  return (
    <ProjectDetailAltLayout
      descriptionSlot={<DetailInfoSkeleton />}
      statusSlot={<DetailInfoSkeleton />}
      deadlineSlot={<DetailInfoSkeleton />}
      customerSlot={<DetailInfoSkeleton />}
      categorySlot={<DetailInfoSkeleton />}
      creatorSlot={<DetailInfoSkeleton className="border-none pb-0" />}
    />
  );
}
