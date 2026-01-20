import { CommentItemContent } from "./CommentItemContent";

interface CommentItemLayoutProps {
  senderImageSlot: React.ReactNode;
  senderNameAndDateSlot: React.ReactNode;
  contentSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export function CommentItemLayout({
  senderImageSlot,
  senderNameAndDateSlot,
  contentSlot,
  menuTriggerSlot,
}: CommentItemLayoutProps) {
  return (
    <div
      data-test="comment-item"
      className="flex flex-col gap-4 border-gray-300 not-last:border-b-1 not-last:pb-4 dark:border-gray-600"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {senderImageSlot}
          {senderNameAndDateSlot}
        </div>
        {menuTriggerSlot}
      </div>

      <CommentItemContent>{contentSlot}</CommentItemContent>
    </div>
  );
}
