import { CommentList } from "../CommentList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentListExample } from "./CommentListExample";
import { CommentFormProvider } from "../../CommentFormContext";
import { SendCommentProvider } from "../../SendCommentContext";
import { UpdateCommentProvider } from "../../UpdateCommentContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/comments/CommentList",
  tags: ["!dev"],
  component: CommentList,
  decorators: [
    (Story) => (
      <CommentFormProvider entityId={1} entityKey="task" mutateUrl="">
        <SendCommentProvider>
          <UpdateCommentProvider>
            <Story />
          </UpdateCommentProvider>
        </SendCommentProvider>
      </CommentFormProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: null,
  },
  render: () => <CommentListExample />,
} satisfies Story;
