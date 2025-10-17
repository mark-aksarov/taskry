import { Repeat } from "@/components/common/Repeat";
import {
  CommentItem,
  CommentItemCard,
} from "@/components/comments/CommentItem";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Repeat
        items={10}
        renderItem={() => (
          <CommentItemCard>
            <CommentItem />
          </CommentItemCard>
        )}
      />
    </div>
  );
}
