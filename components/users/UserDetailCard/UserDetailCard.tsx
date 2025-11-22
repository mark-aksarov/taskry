import {
  UserCardLeft,
  UserCardHeader,
  UserCardTitle,
  UserCardRight,
  UserCard,
} from "../UserCard";

interface UserDetailCardProps {
  profileHeader: React.ReactNode;
  profileDetail: React.ReactNode;
  navigationDesktop: React.ReactNode;
}

export function UserDetailCard({
  profileHeader,
  profileDetail,
  navigationDesktop,
}: UserDetailCardProps) {
  return (
    <UserCard>
      <UserCardLeft>
        <UserCardHeader>
          <UserCardTitle>User Information</UserCardTitle>
        </UserCardHeader>
        <div className="p-6">{profileDetail}</div>
      </UserCardLeft>

      <UserCardRight>
        {profileHeader}
        {navigationDesktop}
      </UserCardRight>
    </UserCard>
  );
}
