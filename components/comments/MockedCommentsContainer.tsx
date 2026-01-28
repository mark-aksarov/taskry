import { CommentItem } from "./CommentItem";
import { fn } from "storybook/internal/test";
import { CommentItemActionMenuTrigger } from "./CommentItem/CommentItemActionMenuTrigger";

const mockedComments = [
  {
    id: 1,
    content:
      "This looks great! I especially like how you handled the async logic.",
    createdAt: "2025-11-10T09:15:00Z",
    sender: { id: "u1", fullName: "Alice Johnson", imageUrl: "woman.jpg" },
    attachments: [],
  },
  {
    id: 2,
    content:
      "Could you explain why you chose Immer here instead of a plain reducer?",
    createdAt: "2025-11-10T09:45:00Z",
    sender: { id: "u2", fullName: "Bob Miller", imageUrl: "man.jpg" },
    attachments: [],
  },
  {
    id: 3,
    content:
      "I’ve added a similar feature recently — we might reuse some logic!",
    createdAt: "2025-11-10T10:05:00Z",
    sender: { id: "u3", fullName: "Carla Chen", imageUrl: "woman.jpg" },
    attachments: [{ id: 1, fileUrl: "placeholder.jpg" }],
  },
  {
    id: 4,
    content:
      "You could optimize the fetcher by memoizing the key or batching requests.",
    createdAt: "2025-11-10T11:00:00Z",
    sender: { id: "u4", fullName: "Daniel Ivanov" },
    attachments: [],
  },
  {
    id: 5,
    content:
      "I found a small typo in your variable name — 'taskDeail' instead of 'taskDetail'.",
    createdAt: "2025-11-10T11:35:00Z",
    sender: { id: "u5", fullName: "Eva Brown", imageUrl: "woman.jpg" },
    attachments: [],
  },
  {
    id: 6,
    content:
      "Maybe we should display attachments as previews rather than links?",
    createdAt: "2025-11-10T12:10:00Z",
    sender: { id: "u6", fullName: "Frank Wilson", imageUrl: "man.jpg" },
    attachments: [{ id: 2, fileUrl: "placeholder.jpg" }],
  },
  {
    id: 7,
    content: "Great work! I’ll merge this once tests pass.",
    createdAt: "2025-11-10T13:20:00Z",
    sender: { id: "u7", fullName: "Grace Lee", imageUrl: "woman.jpg" },
    attachments: [],
  },
  {
    id: 8,
    content:
      "You could extract the repeated markup into a 'CommentBody' subcomponent.",
    createdAt: "2025-11-10T14:00:00Z",
    sender: { id: "u8", fullName: "Henry Scott" },
    attachments: [],
  },
  {
    id: 9,
    content: "I love the clean UI — minimal and functional!",
    createdAt: "2025-11-10T14:45:00Z",
    sender: { id: "u9", fullName: "Isabella Torres", imageUrl: "woman.jpg" },
    attachments: [{ id: 3, fileUrl: "placeholder.jpg" }],
  },
  {
    id: 10,
    content:
      "We should probably limit comment length on the backend to avoid spam.",
    createdAt: "2025-11-10T15:30:00Z",
    sender: { id: "u10", fullName: "Jack Anderson", imageUrl: "man.jpg" },
    attachments: [],
  },
];

export function MockedCommentsContainer() {
  return (
    <>
      {mockedComments.map((comment) => (
        <CommentItem
          key={comment.id}
          content={comment.content}
          createdAt={new Date(comment.createdAt)}
          attachments={comment.attachments}
          sender={comment.sender}
          menuTrigger={
            <CommentItemActionMenuTrigger
              guestMode={false}
              commentId={comment.id}
              commentContent={comment.content}
              deleteAction={fn()}
              mutate={fn()}
            />
          }
        />
      ))}
    </>
  );
}
