import {
  DetailInfo,
  DetailText,
  DetailTitle,
  DetailRow,
  DetailInfoSkeleton,
} from "@/components/common/Detail";
import { UserPreview } from "@/lib/queries/types";

export function ProfileInfoInner({
  user,
  formattedBirthdate,
}: {
  user?: UserPreview;
  formattedBirthdate?: string;
}) {
  const rowStyles = "max-lg:flex-col max-lg:gap-4";

  return (
    <div className="flex flex-col gap-4">
      <DetailRow className={rowStyles}>
        {!user ? (
          <>
            <DetailInfoSkeleton />
          </>
        ) : (
          <>
            <DetailInfo>
              <DetailTitle>Bio</DetailTitle>
              <DetailText>{user.bio}</DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>

      <DetailRow className={rowStyles}>
        {!user ? (
          <>
            <DetailInfoSkeleton />
            <DetailInfoSkeleton />
          </>
        ) : (
          <>
            <DetailInfo>
              <DetailTitle>Full name</DetailTitle>
              <DetailText>{user.fullName}</DetailText>
            </DetailInfo>
            <DetailInfo>
              <DetailTitle>Position</DetailTitle>
              <DetailText>
                {user.position ? user.position.name : "Unknown position"}
              </DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>

      <DetailRow className={rowStyles}>
        {!user ? (
          <>
            <DetailInfoSkeleton />
            <DetailInfoSkeleton />
          </>
        ) : (
          <>
            <DetailInfo>
              <DetailTitle>Email address</DetailTitle>
              <DetailText>{user.email}</DetailText>
            </DetailInfo>
            <DetailInfo>
              <DetailTitle>Phone number</DetailTitle>
              <DetailText>{user.phoneNumber}</DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>

      <DetailRow className={rowStyles}>
        {!user ? (
          <>
            <DetailInfoSkeleton />
            <DetailInfoSkeleton />
          </>
        ) : (
          <>
            <DetailInfo>
              <DetailTitle>Address</DetailTitle>
              <DetailText>{user.address}</DetailText>
            </DetailInfo>
            <DetailInfo>
              <DetailTitle>Public link</DetailTitle>
              <DetailText>{user.publicLink}</DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>

      <DetailRow className={rowStyles}>
        {!user ? (
          <>
            <DetailInfoSkeleton className="border-none" />
          </>
        ) : (
          <>
            <DetailInfo className="border-none">
              <DetailTitle>Date of birth</DetailTitle>
              <DetailText>{formattedBirthdate}</DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>
    </div>
  );
}
