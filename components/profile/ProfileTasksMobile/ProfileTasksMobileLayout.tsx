import { ProfileTaskList } from "../ProfileTaskList";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import {
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ProfileTasksEmptySection } from "../ProfileTasksEmptySection";
import { ProfileNavigationMobile } from "../ProfileNavigationMobile";

export function ProfileTasksMobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!children) {
    return (
      <PageContainer fullscreen className="md:hidden">
        <PageGrid className="flex-auto">
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ProfileNavigationMobile />
          </ToolbarMobileBottom>
          <ProfileTasksEmptySection />
        </PageGrid>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="md:hidden">
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <ProfileNavigationMobile />
        </ToolbarMobileBottom>
        <ProfileTaskList>{children}</ProfileTaskList>
      </PageGrid>
    </PageContainer>
  );
}
