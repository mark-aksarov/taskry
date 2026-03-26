"use client";

import { CommentButton } from "@/components/comments/CommentButton";

export interface ItemBaseCommentsButtonProps {
  commentsCount: number;
  "data-test"?: string;
  className?: string;
  onPress: () => void;
}

export function ItemBaseCommentsButton({
  commentsCount,
  "data-test": dataTest,
  className,
  onPress,
}: ItemBaseCommentsButtonProps) {
  return (
    <CommentButton
      data-test={dataTest}
      label={commentsCount}
      className={className}
      onPress={onPress}
    />
  );
}
