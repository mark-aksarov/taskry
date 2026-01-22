import { MessageSquare } from "lucide-react";
import { ItemBaseButton, ItemBaseButtonProps } from "../common/ItemBase";

export function CommentButton(props: ItemBaseButtonProps) {
  return (
    <ItemBaseButton
      iconLeft={
        <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
      }
      {...props}
    />
  );
}
