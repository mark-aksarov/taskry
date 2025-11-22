import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { PersonHeaderInfoSkeleton } from "./PersonHeaderInfo";
import { PersonHeaderLayout } from "./PersonHeaderLayout";

export function PersonHeaderSkeleton() {
  return (
    <PersonHeaderLayout
      imageSlot={<ImageContainerSkeleton className="h-21 w-21" />}
      infoSlot={<PersonHeaderInfoSkeleton />}
    />
  );
}
