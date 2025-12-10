import {
  UserCard,
  UserCardLeft,
  UserCardTitle,
  UserCardRight,
  UserCardHeader,
} from "../UserCard";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("users.UserDetailCard");

  return (
    <UserCard>
      <UserCardLeft>
        <UserCardHeader>
          <UserCardTitle>{t("title")}</UserCardTitle>
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
