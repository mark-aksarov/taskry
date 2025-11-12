import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { TaskCommentsModalTrigger } from "./TaskCommentsModalTrigger";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";
import { Repeat } from "@/components/common/Repeat";

export function MockedTaskCommentsContainer() {
  return (
    <>
      <CommentItem
        content="This looks great! I especially like how you handled the async logic."
        createdAt={new Date("2025-11-10T09:15:00Z")}
        attachments={[]}
        likes={5}
        likedByMe={true}
        sender={{
          id: "u1",
          fullName: "Alice Johnson",
          imageUrl: "woman.jpg",
        }}
      />

      <CommentItem
        content="Could you explain why you chose Immer here instead of a plain reducer?"
        createdAt={new Date("2025-11-10T09:45:00Z")}
        attachments={[]}
        likes={2}
        likedByMe={false}
        sender={{
          id: "u2",
          fullName: "Bob Miller",
          imageUrl: "man.jpg",
        }}
      />

      <CommentItem
        content="I’ve added a similar feature recently — we might reuse some logic!"
        createdAt={new Date("2025-11-10T10:05:00Z")}
        attachments={[{ id: 1, fileUrl: "placeholder.jpg" }]}
        likes={8}
        likedByMe={true}
        sender={{
          id: "u3",
          fullName: "Carla Chen",
          imageUrl: "woman.jpg",
        }}
      />

      <CommentItem
        content="You could optimize the fetcher by memoizing the key or batching requests."
        createdAt={new Date("2025-11-10T11:00:00Z")}
        attachments={[]}
        likes={3}
        likedByMe={false}
        sender={{
          id: "u4",
          fullName: "Daniel Ivanov",
        }}
      />

      <CommentItem
        content="I found a small typo in your variable name — 'taskDeail' instead of 'taskDetail'."
        createdAt={new Date("2025-11-10T11:35:00Z")}
        attachments={[]}
        likes={1}
        likedByMe={false}
        sender={{
          id: "u5",
          fullName: "Eva Brown",
          imageUrl: "woman.jpg",
        }}
      />

      <CommentItem
        content="Maybe we should display attachments as previews rather than links?"
        createdAt={new Date("2025-11-10T12:10:00Z")}
        attachments={[{ id: 2, fileUrl: "placeholder.jpg" }]}
        likes={6}
        likedByMe={true}
        sender={{
          id: "u6",
          fullName: "Frank Wilson",
          imageUrl: "man.jpg",
        }}
      />

      <CommentItem
        content="Great work! I’ll merge this once tests pass."
        createdAt={new Date("2025-11-10T13:20:00Z")}
        attachments={[]}
        likes={10}
        likedByMe={true}
        sender={{
          id: "u7",
          fullName: "Grace Lee",
          imageUrl: "woman.jpg",
        }}
      />

      <CommentItem
        content="You could extract the repeated markup into a 'CommentBody' subcomponent."
        createdAt={new Date("2025-11-10T14:00:00Z")}
        attachments={[]}
        likes={4}
        likedByMe={false}
        sender={{
          id: "u8",
          fullName: "Henry Scott",
        }}
      />

      <CommentItem
        content="I love the clean UI — minimal and functional!"
        createdAt={new Date("2025-11-10T14:45:00Z")}
        attachments={[{ id: 3, fileUrl: "placeholder.jpg" }]}
        likes={7}
        likedByMe={true}
        sender={{
          id: "u9",
          fullName: "Isabella Torres",
          imageUrl: "woman.jpg",
        }}
      />

      <CommentItem
        content="We should probably limit comment length on the backend to avoid spam."
        createdAt={new Date("2025-11-10T15:30:00Z")}
        attachments={[]}
        likes={2}
        likedByMe={false}
        sender={{
          id: "u10",
          fullName: "Jack Anderson",
          imageUrl: "man.jpg",
        }}
      />
    </>
  );
}

const meta = {
  title: "Components/tasks/TaskCommentsModalTrigger",
  component: TaskCommentsModalTrigger,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant({ variant: "alt" })],
  excludeStories: ["MockedTaskCommentsContainer"],
  args: {
    commentCount: 25,
    taskId: 1,
  },
} satisfies Meta<typeof TaskCommentsModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  decorators: [
    (Story) => (
      <CommentsContainerProvider
        CommentsContainer={() => <MockedTaskCommentsContainer />}
      >
        <Story />
      </CommentsContainerProvider>
    ),
  ],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <CommentsContainerProvider
        CommentsContainer={() => (
          <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
        )}
      >
        <Story />
      </CommentsContainerProvider>
    ),
  ],
} satisfies Story;
