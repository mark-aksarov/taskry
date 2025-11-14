import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ProfileHeaderInfoSkeleton } from "./ProfileHeaderInfo";
import { ProfileHeaderLayout } from "./ProfileHeaderLayout";

export function ProfileHeaderSkeleton() {
  return (
    <ProfileHeaderLayout
      imageSlot={<ImageContainerSkeleton className="h-21 w-21" />}
      infoSlot={<ProfileHeaderInfoSkeleton />}
    />
  );
}
