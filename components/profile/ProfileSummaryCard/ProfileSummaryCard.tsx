import Image from "next/image";
import {
  EntityCard,
  EntitySummaryInfo,
  EntitySummaryTitle,
  EntitySummaryText,
  EntitySummaryInfoSkeleton,
} from "@/components/common/Entity";
import { getUserById } from "@/lib/queries/user";
import { Button, Divider, Skeleton } from "@/components/ui";
import { UserPreview } from "@/lib/queries/types";
import { twMerge } from "tailwind-merge";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";

export async function ProfileSummaryCard() {
  const user = await getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return <ProfileSummaryCardInner user={user} />;
}

export function ProfileSummaryCardSkeleton() {
  return <ProfileSummaryCardInner />;
}

function ProfileSummaryCardInner({ user }: { user?: UserPreview }) {
  const buttonClasses = "max-md:flex-1 max-md:justify-center";

  return (
    <EntityCard>
      <div className="flex gap-4 max-md:flex-col max-md:items-center md:items-start">
        {!user ? (
          <ImageContainerSkeleton className="h-15 w-15" />
        ) : user.imageUrl ? (
          <ImageContainer className="h-15 w-15">
            <Image fill src={user.imageUrl} alt={user.fullName} />
          </ImageContainer>
        ) : (
          <ImageContainer className="h-15 w-15" />
        )}

        {!user ? (
          <EntitySummaryInfoSkeleton />
        ) : (
          <EntitySummaryInfo>
            <EntitySummaryTitle>{user?.fullName}</EntitySummaryTitle>
            <EntitySummaryText>{user?.bio}</EntitySummaryText>
          </EntitySummaryInfo>
        )}
      </div>

      {!user ? <Skeleton className="h-px" /> : <Divider />}

      <div className="flex gap-4">
        {!user ? (
          <>
            <Skeleton
              className={twMerge(
                "h-8 rounded-lg md:w-[6.75rem]",
                buttonClasses,
              )}
            />
            <Skeleton
              className={twMerge(
                "h-8 rounded-lg md:w-[7.75rem]",
                buttonClasses,
              )}
            />
          </>
        ) : (
          <>
            <Button
              variant="contrast"
              label="Delete account"
              className={buttonClasses}
            />
            <Button
              variant="outlined"
              label="Change password"
              className={buttonClasses}
            />
          </>
        )}
      </div>
    </EntityCard>
  );
}
