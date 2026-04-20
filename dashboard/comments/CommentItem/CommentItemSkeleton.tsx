import { Skeleton } from "@/ui/Skeleton";
import { CommentItemLayout } from "./CommentItemLayout";
import { CommentItemInfoSkeleton } from "./CommentItemInfo";
import { ImageContainerSkeleton } from "@/dashboard/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/dashboard/common/ItemBase";

export function CommentItemSkeleton() {
  return (
    <CommentItemLayout
      senderImageSlot={<ImageContainerSkeleton className="h-9 w-9" />}
      senderNameAndDateSlot={<CommentItemInfoSkeleton />}
      contentSlot={
        <div className="flex flex-col">
          <Skeleton size="sm" className="w-[15rem]" />
        </div>
      }
      menuTriggerSlot={<ItemBaseActionMenuTriggerSkeleton />}
    />
  );
}
