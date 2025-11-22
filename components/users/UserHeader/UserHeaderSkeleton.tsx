import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { UserHeaderInfoSkeleton } from "./UserHeaderInfo";
import { UserHeaderLayout } from "./UserHeaderLayout";

export function UserHeaderSkeleton() {
  return (
    <UserHeaderLayout
      imageSlot={<ImageContainerSkeleton className="h-21 w-21" />}
      infoSlot={<UserHeaderInfoSkeleton />}
    />
  );
}
