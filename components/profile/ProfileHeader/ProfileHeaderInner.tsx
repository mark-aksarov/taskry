import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";
import { Link } from "@/components/ui";
import { UserPreview } from "@/lib/queries/types";
import Image from "next/image";
import {
  ProfileHeaderInfo,
  ProfileHeaderInfoSkeleton,
} from "./ProfileHeaderInfo";
import { ProfileHeaderTitle } from "./ProfileHeaderTitle";
import { ProfileHeaderText } from "./ProfileHeaderText";

export function ProfileHeaderInner({ user }: { user?: UserPreview }) {
  return (
    <div className="flex flex-col items-center gap-4">
      {!user ? (
        <ImageContainerSkeleton className="h-21 w-21" />
      ) : user.imageUrl ? (
        <Link href={`/users/${user.id}`}>
          <ImageContainer className="h-21 w-21">
            <Image fill src={user.imageUrl} alt={user.fullName} />
          </ImageContainer>
        </Link>
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
