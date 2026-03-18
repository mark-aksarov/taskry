import {
  DetailCard,
  DetailCardLeft,
  DetailCardTitle,
  DetailCardRight,
  DetailCardHeader,
} from "@/components/common/DetailCard";
import { useTranslations } from "next-intl";

interface UserDetailCardProps {
  userDetailHeaderContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
  navigationLarge: React.ReactNode;
}

export function UserDetailCard({
  userDetailHeaderContainer,
  userDetailContainer,
  navigationLarge,
}: UserDetailCardProps) {
  const t = useTranslations("users.UserDetailCard");

  return (
    <DetailCard data-test="user-card">
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>{t("title")}</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">{userDetailContainer}</div>
      </DetailCardLeft>

      <DetailCardRight>
        {userDetailHeaderContainer}
        {navigationLarge}
      </DetailCardRight>
    </DetailCard>
  );
}
