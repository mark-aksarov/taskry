import {
  EntityCard,
  EntityDetailsInfo,
  EntityDetailsText,
  EntityDetailsTitle,
  EntityDetailsRow,
  EntityDetailsInfoSkeleton,
} from "@/components/common/Entity";
import { Button, Skeleton } from "@/components/ui";
import { UserPreview } from "@/lib/queries/types";
import { twMerge } from "tailwind-merge";

export function ProfileDetailsCardInner({
  user,
  formattedBirthdate,
}: {
  user?: UserPreview;
  formattedBirthdate?: string;
}) {
  const buttonClasses = "max-md:justify-center md:self-start";

  return (
    <EntityCard>
      <EntityDetailsRow>
        {!user ? (
          <>
            <EntityDetailsInfoSkeleton />
            <EntityDetailsInfoSkeleton />
          </>
        ) : (
          <>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Full name</EntityDetailsTitle>
              <EntityDetailsText>{user.fullName}</EntityDetailsText>
            </EntityDetailsInfo>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Position</EntityDetailsTitle>
              <EntityDetailsText>
                {user.position ? user.position.name : "Unknown position"}
              </EntityDetailsText>
            </EntityDetailsInfo>
          </>
        )}
      </EntityDetailsRow>

      <EntityDetailsRow>
        {!user ? (
          <>
            <EntityDetailsInfoSkeleton />
            <EntityDetailsInfoSkeleton />
          </>
        ) : (
          <>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Date of birth</EntityDetailsTitle>
              <EntityDetailsText>{formattedBirthdate}</EntityDetailsText>
            </EntityDetailsInfo>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Email address</EntityDetailsTitle>
              <EntityDetailsText>{user.email}</EntityDetailsText>
            </EntityDetailsInfo>
          </>
        )}
      </EntityDetailsRow>

      <EntityDetailsRow>
        {!user ? (
          <>
            <EntityDetailsInfoSkeleton />
            <EntityDetailsInfoSkeleton />
          </>
        ) : (
          <>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Phone number</EntityDetailsTitle>
              <EntityDetailsText>{user.phoneNumber}</EntityDetailsText>
            </EntityDetailsInfo>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Address</EntityDetailsTitle>
              <EntityDetailsText>{user.address}</EntityDetailsText>
            </EntityDetailsInfo>
          </>
        )}
      </EntityDetailsRow>

      {!user ? (
        <Skeleton
          className={twMerge("h-8 rounded-lg md:w-[5.75rem]", buttonClasses)}
        />
      ) : (
        <Button
          variant="outlined"
          label="Edit account"
          className={buttonClasses}
        />
      )}
    </EntityCard>
  );
}
