import {
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { ToolbarDesktop, ToolbarMobileTop } from "@/components/common/Toolbar";

interface EmptyPageContainerProps {
  heading: string;
  description: string;
  toolbarCreateNewMenuTrigger: React.ReactNode;
}

export function EmptyPageContainer({
  heading,
  description,
  toolbarCreateNewMenuTrigger,
}: EmptyPageContainerProps) {
  return (
    <PageContainer fullscreen className="relative">
      <PageGrid className="flex-auto">
        <ToolbarDesktop>
          <div className="ml-auto">{toolbarCreateNewMenuTrigger}</div>
        </ToolbarDesktop>
        <ToolbarMobileTop>
          <div className="ml-auto">{toolbarCreateNewMenuTrigger}</div>
        </ToolbarMobileTop>

        <PageEmptySection>
          <EmptySectionHeading>{heading}</EmptySectionHeading>
          <EmptySectionDescription>{description}</EmptySectionDescription>
        </PageEmptySection>
      </PageGrid>
    </PageContainer>
  );
}
