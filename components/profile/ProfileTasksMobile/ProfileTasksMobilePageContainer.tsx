import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";

export function ProfileTasksMobilePageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer className="md:hidden">
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
        </ToolbarMobileTop>
        {children}
      </PageGrid>
    </PageContainer>
  );
}
