import {
  ProfileCardLeft,
  ProfileCardHeader,
  ProfileCardTitle,
  ProfileCardRight,
  ProfileCard,
} from "../ProfileCard";

interface ProfileDetailCardProps {
  profileHeader: React.ReactNode;
  profileDetail: React.ReactNode;
  profileNavigationDesktop: React.ReactNode;
}

export function ProfileDetailCard({
  profileHeader,
  profileDetail,
  profileNavigationDesktop,
}: ProfileDetailCardProps) {
  return (
    <ProfileCard>
      <ProfileCardLeft>
        <ProfileCardHeader>
          <ProfileCardTitle>Profile Information</ProfileCardTitle>
        </ProfileCardHeader>
        <div className="p-6">{profileDetail}</div>
      </ProfileCardLeft>

      <ProfileCardRight>
        {profileHeader}
        {profileNavigationDesktop}
      </ProfileCardRight>
    </ProfileCard>
  );
}
