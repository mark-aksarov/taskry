import { Suspense } from "react";
import {
  ProfileDetailPanelHeader,
  ProfileDetailPanelHeaderSkeleton,
} from "@/components/profile/ProfileDetailPanelHeader";
import { DetailPanel } from "@/components/common/DetailPanel";
import { ProfileDetailNavigation } from "@/components/profile/ProfileDetailNavigation";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ProfileDetailCard } from "@/components/profile/ProfileDetailCard";

export default async function ProfilePage() {
  return (
    <>
      <ProfileDetailCard />

      <div className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Profile Settings</ToolbarMobileHeading>
          </ToolbarMobileTop>
          <Card>
            <DetailPanel>
              <Suspense fallback={<ProfileDetailPanelHeaderSkeleton />}>
                <ProfileDetailPanelHeader />
              </Suspense>
              <ProfileDetailNavigation />
            </DetailPanel>
          </Card>
        </PageGrid>
      </div>
    </>
  );
}
