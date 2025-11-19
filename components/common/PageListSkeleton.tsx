import { Skeleton } from "../ui";
import { List } from "./List";
import { PageContainer } from "./PageContainer";
import { PageGrid } from "./PageGrid";
import { Repeat } from "./Repeat";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "./Toolbar";

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
          <Repeat items={10} renderItem={renderItemSkeleton} />
        </List>
      </PageGrid>
    </PageContainer>
  );
}
