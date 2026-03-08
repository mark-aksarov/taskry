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
  toolbarManageMenuTrigger?: React.ReactNode;
}

export function EmptyPageContainer({
  heading,
  description,
  toolbarCreateNewMenuTrigger,
  toolbarManageMenuTrigger,
}: EmptyPageContainerProps) {
  return (
    <PageContainer fullscreen headerOffset className="relative">
      <PageGrid className="flex-auto">
        <ToolbarDesktop>
          {toolbarManageMenuTrigger}
          <div className="ml-auto">{toolbarCreateNewMenuTrigger}</div>
        </ToolbarDesktop>
        <ToolbarMobileTop>
          {toolbarManageMenuTrigger}
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
