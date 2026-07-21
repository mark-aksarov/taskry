import { ButtonProps } from "@/ui/Button";
import { MessageSquare } from "lucide-react";
import { ItemBaseButton } from "../common/ItemBase";

export function CommentButton(props: ButtonProps) {
  return (
    <ItemBaseButton
      iconLeft={
        <MessageSquare    />
      }
      {...props}
    />
  );
}
