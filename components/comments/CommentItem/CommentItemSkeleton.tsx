"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { CommentItemLayout } from "./CommentItemLayout";
import { CommentItemInfoSkeleton } from "./CommentItemInfo";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export function CommentItemSkeleton() {
  return (
    <CommentItemLayout
      senderImageSlot={<ImageContainerSkeleton className="h-9 w-9" />}
      senderNameAndDateSlot={<CommentItemInfoSkeleton />}
      contentSlot={
        <div className="flex flex-col">
          <Skeleton size="sm" />
          <Skeleton size="sm" />
          <Skeleton size="sm" />
        </div>
      }
      menuTriggerSlot={<ItemBaseActionMenuTriggerSkeleton />}
    />
  );
}
