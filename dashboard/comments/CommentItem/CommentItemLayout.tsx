import { tv } from "tailwind-variants";
import { CommentItemContent } from "./CommentItemContent";

const styles = tv({
  slots: {
    root: [
      "flex flex-col gap-4",
      "not-last:border-b-1 not-last:pb-4",
      "border-(--border-primary)",
    ],
    header: "flex items-start justify-between",
    sender: "flex items-center gap-3",
  },
});

interface CommentItemLayoutProps {
  className?: string;
  senderImageSlot: React.ReactNode;
  senderNameAndDateSlot: React.ReactNode;
  contentSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export function CommentItemLayout({
  className,
  senderImageSlot,
  senderNameAndDateSlot,
  contentSlot,
  menuTriggerSlot,
}: CommentItemLayoutProps) {
  const { root, header, sender } = styles();

  return (
    <div data-test="comment-item" className={root({ className })}>
      <div className={header()}>
        <div className={sender()}>
          {senderImageSlot}
          {senderNameAndDateSlot}
        </div>
        {menuTriggerSlot}
      </div>

      <CommentItemContent>{contentSlot}</CommentItemContent>
    </div>
  );
}
