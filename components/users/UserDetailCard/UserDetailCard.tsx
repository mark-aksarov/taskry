import {
  DetailCard,
  DetailCardLeft,
  DetailCardTitle,
  DetailCardRight,
  DetailCardHeader,
} from "@/components/common/DetailCard";
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
    <DetailCard data-test="user-card">
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>{t("title")}</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">{profileDetail}</div>
      </DetailCardLeft>

      <DetailCardRight>
        {profileHeader}
        {navigationDesktop}
      </DetailCardRight>
    </DetailCard>
  );
}
