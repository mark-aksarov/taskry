import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { DetailHeaderInfoSkeleton } from "./DetailHeaderInfo";
import { DetailHeaderLayout } from "./DetailHeaderLayout";

export function DetailHeaderSkeleton() {
  return (
    <DetailHeaderLayout
      imageSlot={<ImageContainerSkeleton className="h-21 w-21" />}
      infoSlot={<DetailHeaderInfoSkeleton />}
    />
  );
}
