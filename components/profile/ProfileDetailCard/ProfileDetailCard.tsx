import { Card } from "@/components/common/Card";
import { ProfileNavigationDesktop } from "@/components/profile/ProfileNavigationDesktop";
import {
  ProfileCardLeft,
  ProfileCardHeader,
  ProfileCardTitle,
  ProfileCardRight,
} from "../ProfileCard";

export function ProfileDetailCard({
  profileHeader,
  profileDetail,
}: {
  profileHeader: React.ReactNode;
  profileDetail: React.ReactNode;
}) {
  return (
    <Card className="flex p-0 max-md:hidden">
      <ProfileCardLeft>
        <ProfileCardHeader>
          <ProfileCardTitle>Profile Information</ProfileCardTitle>
        </ProfileCardHeader>
        <div className="p-6">{profileDetail}</div>
      </ProfileCardLeft>

      <ProfileCardRight>
        {profileHeader}
        <ProfileNavigationDesktop />
      </ProfileCardRight>
    </Card>
  );
}
