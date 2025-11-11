import {
  ListItem,
  ListItemInfoSkeleton,
  ListItemProgressSkeleton,
} from "@/components/common/List";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";

export const TaskListItemSkeleton = () => {
  return (
    <ListItem>
      <ListItemInfoSkeleton />
      <ListItemInfoSkeleton className="@max-3xl:hidden" />
      <ListItemInfoSkeleton className="@max-4xl:hidden" />
      <ListItemInfoSkeleton className="@max-5xl:hidden" />
      <div className="flex flex-none items-center justify-end gap-4">
        <ListItemProgressSkeleton />

        <div className="flex items-center gap-2">
          <ImageContainerSkeleton className="h-8 w-8" />
          <MenuTriggerSkeleton />
        </div>
      </div>
    </ListItem>
  );
};
