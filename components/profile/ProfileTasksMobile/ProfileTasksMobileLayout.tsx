import { ProfileTaskList } from "../ProfileTaskList";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ProfileTasksEmptySection } from "../ProfileTasksEmptySection";

export function ProfileTasksMobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!children) {
    return (
      <PageContainer className="md:hidden">
        <ProfileTasksEmptySection />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="md:hidden">
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <ProfileTaskList>{children}</ProfileTaskList>
      </PageGrid>
    </PageContainer>
  );
}
