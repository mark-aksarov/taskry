"use client";

import { CommentButton } from "@/components/comments/CommentButton";

export interface ItemBaseCommentsButtonProps {
  commentsCount: number;
  "data-test"?: string;
  "data-id"?: string;
  className?: string;
  onPress: () => void;
}

export function ItemBaseCommentsButton({
  commentsCount,
  "data-test": dataTest,
  "data-id": dataId,
  className,
  onPress,
}: ItemBaseCommentsButtonProps) {
  return (
    <CommentButton
      data-test={dataTest}
      data-id={dataId}
      label={commentsCount}
      className={className}
      onPress={onPress}
    />
  );
}
