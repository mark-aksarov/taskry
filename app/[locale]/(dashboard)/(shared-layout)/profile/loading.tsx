import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { UserDetailAltSkeleton } from "@/components/users/UserDetailAlt";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { ProfileActionsSkeleton } from "@/components/users/ProfileActions";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationLarge } from "@/components/users/ProfileNavigationLarge";

export default function AppProfileLoading() {
  const t = useTranslations("app.ProfilePage");

  return (
    <>
      <PageContainer>
        <UserDetailCard
          userDetailContainer={<UserDetailAltSkeleton />}
          userDetailHeaderContainer={<DetailHeaderSkeleton />}
          navigationLarge={
            <ProfileNavigationLarge
              profileActions={<ProfileActionsSkeleton />}
            />
          }
        />

        <PageGrid className="md:hidden">
          <ToolbarMobile
            firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
          />

          <ToolbarMobile firstSlot={<ProfileNavigationMobile />} />

          <div className="flex flex-col">
            <DetailHeaderSkeleton />
          </div>
          <Card className="flex flex-col p-1.5">
            <ProfileActionsSkeleton />
          </Card>
          <Card className="flex flex-col">
            <UserDetailAltSkeleton />
          </Card>
        </PageGrid>
      </PageContainer>
    </>
  );
}
