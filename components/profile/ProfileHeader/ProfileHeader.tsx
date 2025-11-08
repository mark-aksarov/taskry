import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";
import Image from "next/image";
import {
  ProfileHeaderInfo,
  ProfileHeaderInfoSkeleton,
} from "./ProfileHeaderInfo";
import { ProfileHeaderTitle } from "./ProfileHeaderTitle";
import { ProfileHeaderText } from "./ProfileHeaderText";

export interface UserProfileData {
  fullName: string;
  imageUrl?: string | null;
  position?: {
    name: string;
  } | null;
}

export function ProfileHeader({ user }: { user?: UserProfileData }) {
  return (
    <div className="inline-flex flex-col items-center gap-4">
      {!user ? (
        <ImageContainerSkeleton className="h-21 w-21" />
      ) : user.imageUrl ? (
        <ImageContainer className="h-21 w-21">
          <Image fill src={user.imageUrl} alt={user.fullName} />
        </ImageContainer>
      ) : (
        <ImageContainer className="h-21 w-21" />
      )}

      {!user ? (
        <ProfileHeaderInfoSkeleton />
      ) : (
        <ProfileHeaderInfo>
          <ProfileHeaderTitle>{user.fullName}</ProfileHeaderTitle>
          <ProfileHeaderText>
            {user.position ? user.position.name : "Unknown position"}
          </ProfileHeaderText>
        </ProfileHeaderInfo>
      )}
    </div>
  );
}
