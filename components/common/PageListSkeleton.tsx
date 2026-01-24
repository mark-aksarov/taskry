import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "./Toolbar";

import { List } from "./List";
import { Repeat } from "./Repeat";
import { PageGrid } from "./PageGrid";
import { Skeleton } from "../ui/Skeleton";
import { PageContainer } from "./PageContainer";

interface PageListSkeletonProps {
  title: string;
  renderItemSkeleton: () => React.ReactNode;
}

export function PageListSkeleton({
  title,
  renderItemSkeleton,
}: PageListSkeletonProps) {
  return (
    <PageContainer>
      <PageGrid>
        <ToolbarDesktop>
          <Skeleton className="h-8 w-[5rem] rounded-lg" />
          <Skeleton className="h-8 w-[5rem] rounded-lg" />
          <Skeleton className="h-8 w-[5rem] rounded-lg" />
          <Skeleton className="ml-auto h-8 w-[5rem] rounded-lg" />
          <Skeleton className="h-8 w-[7rem] rounded-lg" />
        </ToolbarDesktop>

        <ToolbarMobileTop>
          <ToolbarMobileHeading>{title}</ToolbarMobileHeading>
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <Skeleton className="h-8 w-[5rem] rounded-lg" />
          <Skeleton className="ml-auto h-8 w-[7rem] rounded-lg" />
        </ToolbarMobileBottom>

        <List>
          <Repeat items={20} renderItem={renderItemSkeleton} />
        </List>
      </PageGrid>
    </PageContainer>
  );
}
