import { CommentItem } from "../CommentItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentFormProvider } from "../../CommentFormContext";
import { SendCommentProvider } from "../../SendCommentContext";
import { DeleteCommentProvider } from "../../DeleteCommentContext";
import { UpdateCommentProvider } from "../../UpdateCommentContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/comments/CommentItem",
  component: CommentItem,
  decorators: [
    (Story) => (
      <CommentFormProvider entityId={1} entityKey="task" mutateUrl="">
        <DeleteCommentProvider>
          <UpdateCommentProvider>
            <SendCommentProvider>
              <Story />
            </SendCommentProvider>
          </UpdateCommentProvider>
        </DeleteCommentProvider>
      </CommentFormProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CommentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = "Comment content text";

export const Default = {
  args: {
    id: 1,
    content,
    createdAt: "2025-01-01T04:00:00Z",
    sender: {
      id: "user-1",
      fullName: "User 1",
      imageUrl: "/woman.jpg",
    },
    canEdit: true,
  },
} satisfies Story;

export const WithoutSender = {
  args: {
    ...Default.args,
    sender: undefined,
  },
} satisfies Story;

export const WithoutSenderImage = {
  args: {
    ...Default.args,
    sender: {
      ...Default.args.sender,
      imageUrl: undefined,
    },
  },
} satisfies Story;
