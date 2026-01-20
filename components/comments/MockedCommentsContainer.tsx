import { fn } from "storybook/internal/test";
import { CommentItem } from "./CommentItem";
import { CommentItemActionMenuTrigger } from "./CommentItem/CommentItemActionMenuTrigger";

export function MockedCommentsContainer() {
  return (
    <>
      <CommentItem
        content="This looks great! I especially like how you handled the async logic."
        createdAt={new Date("2025-11-10T09:15:00Z")}
        attachments={[]}
        sender={{
          id: "u1",
          fullName: "Alice Johnson",
          imageUrl: "woman.jpg",
        }}
        menuTrigger={
          <CommentItemActionMenuTrigger
            commentId={1}
            deleteAction={fn()}
            mutate={fn()}
          />
        }
      />

      <CommentItem
        content="Could you explain why you chose Immer here instead of a plain reducer?"
        createdAt={new Date("2025-11-10T09:45:00Z")}
        attachments={[]}
        sender={{
          id: "u2",
          fullName: "Bob Miller",
          imageUrl: "man.jpg",
        }}
        menuTrigger={
          <CommentItemActionMenuTrigger
            commentId={2}
            deleteAction={fn()}
            mutate={fn()}
          />
        }
      />

      <CommentItem
        content="I’ve added a similar feature recently — we might reuse some logic!"
        createdAt={new Date("2025-11-10T10:05:00Z")}
        attachments={[{ id: 1, fileUrl: "placeholder.jpg" }]}
        sender={{
          id: "u3",
          fullName: "Carla Chen",
          imageUrl: "woman.jpg",
        }}
        menuTrigger={
          <CommentItemActionMenuTrigger
            commentId={3}
            deleteAction={fn()}
            mutate={fn()}
          />
        }
      />

      <CommentItem
        content="You could optimize the fetcher by memoizing the key or batching requests."
        createdAt={new Date("2025-11-10T11:00:00Z")}
        attachments={[]}
        sender={{
          id: "u4",
          fullName: "Daniel Ivanov",
        }}
        menuTrigger={
          <CommentItemActionMenuTrigger
            commentId={4}
            deleteAction={fn()}
            mutate={fn()}
          />
        }
      />

      <CommentItem
        content="I found a small typo in your variable name — 'taskDeail' instead of 'taskDetail'."
        createdAt={new Date("2025-11-10T11:35:00Z")}
        attachments={[]}
        sender={{
          id: "u5",
          fullName: "Eva Brown",
          imageUrl: "woman.jpg",
        }}
        menuTrigger={
          <CommentItemActionMenuTrigger
            commentId={5}
            deleteAction={fn()}
            mutate={fn()}
          />
        }
      />

      <CommentItem
        content="Maybe we should display attachments as previews rather than links?"
        createdAt={new Date("2025-11-10T12:10:00Z")}
        attachments={[{ id: 2, fileUrl: "placeholder.jpg" }]}
        sender={{
          id: "u6",
          fullName: "Frank Wilson",
          imageUrl: "man.jpg",
        }}
        menuTrigger={
          <CommentItemActionMenuTrigger
            commentId={6}
            deleteAction={fn()}
            mutate={fn()}
          />
        }
      />

      <CommentItem
        content="Great work! I’ll merge this once tests pass."
        createdAt={new Date("2025-11-10T13:20:00Z")}
        attachments={[]}
        sender={{
          id: "u7",
          fullName: "Grace Lee",
          imageUrl: "woman.jpg",
        }}
        menuTrigger={
          <CommentItemActionMenuTrigger
            commentId={7}
            deleteAction={fn()}
            mutate={fn()}
          />
        }
      />

      <CommentItem
        content="You could extract the repeated markup into a 'CommentBody' subcomponent."
        createdAt={new Date("2025-11-10T14:00:00Z")}
        attachments={[]}
        sender={{
          id: "u8",
          fullName: "Henry Scott",
        }}
        menuTrigger={
          <CommentItemActionMenuTrigger
            commentId={8}
            deleteAction={fn()}
            mutate={fn()}
          />
        }
      />

      <CommentItem
        content="I love the clean UI — minimal and functional!"
        createdAt={new Date("2025-11-10T14:45:00Z")}
        attachments={[{ id: 3, fileUrl: "placeholder.jpg" }]}
        sender={{
          id: "u9",
          fullName: "Isabella Torres",
          imageUrl: "woman.jpg",
        }}
        menuTrigger={
          <CommentItemActionMenuTrigger
            commentId={9}
            deleteAction={fn()}
            mutate={fn()}
          />
        }
      />

      <CommentItem
        content="We should probably limit comment length on the backend to avoid spam."
        createdAt={new Date("2025-11-10T15:30:00Z")}
        attachments={[]}
        sender={{
          id: "u10",
          fullName: "Jack Anderson",
          imageUrl: "man.jpg",
        }}
        menuTrigger={
          <CommentItemActionMenuTrigger
            commentId={10}
            deleteAction={fn()}
            mutate={fn()}
          />
        }
      />
    </>
  );
}
