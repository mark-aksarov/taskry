import { CommentItem } from "./CommentItem";
import { CommentItemActionMenuTrigger } from "./CommentItem/CommentItemActionMenuTrigger";

const mockedComments = [
  {
    id: 1,
    content: "Comment 1. Sample comment text.",
    createdAt: "2025-01-01T01:00:00Z",
    sender: { id: "1", fullName: "User 1", imageUrl: "/man.jpg" },
  },
  {
    id: 2,
    content: "Comment 2. Sample comment text.",
    createdAt: "2025-01-01T02:00:00Z",
    sender: { id: "2", fullName: "User 2", imageUrl: "/woman.jpg" },
  },
  {
    id: 3,
    content: "Comment 3. Sample comment text.",
    createdAt: "2025-01-01T03:00:00Z",
    sender: { id: "3", fullName: "User 3", imageUrl: "/woman.jpg" },
  },
  {
    id: 4,
    content: "Comment 4. Sample comment text.",
    createdAt: "2025-01-01T04:00:00Z",
    sender: { id: "4", fullName: "User 4" },
  },
  {
    id: 5,
    content: "Comment 5. Sample comment text.",
    createdAt: "2025-01-01T05:00:00Z",
    sender: { id: "5", fullName: "User 5", imageUrl: "/man.jpg" },
  },
  {
    id: 6,
    content: "Comment 6. Sample comment text.",
    createdAt: "2025-01-01T06:00:00Z",
    sender: { id: "6", fullName: "User 6", imageUrl: "/man.jpg" },
  },
  {
    id: 7,
    content: "Comment 7. Sample comment text.",
    createdAt: "2025-01-01T07:00:00Z",
    sender: { id: "7", fullName: "User 7", imageUrl: "/woman.jpg" },
  },
  {
    id: 8,
    content: "Comment 8. Sample comment text.",
    createdAt: "2025-01-01T08:00:00Z",
    sender: { id: "8", fullName: "User 8" },
  },
  {
    id: 9,
    content: "Comment 9. Sample comment text.",
    createdAt: "2025-01-01",
    sender: { id: "9", fullName: "User 9", imageUrl: "/woman.jpg" },
  },
  {
    id: 10,
    content: "Comment 10. Sample comment text.",
    createdAt: "2025-01-01T10:00:00Z",
    sender: { id: "10", fullName: "User 10", imageUrl: "/man.jpg" },
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
          sender={comment.sender}
          menuTrigger={
            <CommentItemActionMenuTrigger
              guestMode={false}
              commentId={comment.id}
              commentContent={comment.content}
            />
          }
        />
      ))}
    </>
  );
}
