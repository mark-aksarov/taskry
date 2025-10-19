import { Suspense } from "react";
import { getUserById } from "@/lib/queries/user";
import {
  ProfileSummaryCard,
  ProfileSummaryCardSkeleton,
} from "@/components/profile/ProfileSummaryCard";
import {
  ProfileDetailsCard,
  ProfileDetailsCardSkeleton,
} from "@/components/profile/ProfileDetailsCard";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ProfilePageTabs } from "@/components/profile/ProfilePageTabs";

export default async function ProfilePage() {
  const userPromise = getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return (
    <PageGrid>
      <ToolbarDesktop>
        <ProfilePageTabs />
      </ToolbarDesktop>

      <ToolbarMobileTop>
        <ToolbarMobileHeading>Profile</ToolbarMobileHeading>
      </ToolbarMobileTop>

      <ToolbarMobileBottom>
        <ProfilePageTabs />
      </ToolbarMobileBottom>

      <Suspense
        fallback={
          <>
            <ProfileSummaryCardSkeleton />
            <ProfileDetailsCardSkeleton />
          </>
        }
      >
        <ProfileSummaryCard />
        <ProfileDetailsCard userPromise={userPromise} />
      </Suspense>
    </PageGrid>
  );
}
