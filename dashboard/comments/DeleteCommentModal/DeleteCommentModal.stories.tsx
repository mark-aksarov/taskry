import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCommentModal } from "../DeleteCommentModal";
import { CommentFormProvider } from "../CommentFormContext";
import { DeleteCommentProvider } from "../DeleteCommentContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/comments/DeleteCommentModal",
  component: DeleteCommentModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <CommentFormProvider entityId={1} entityKey="task" mutateUrl="">
        <DeleteCommentProvider>
          <Story />
        </DeleteCommentProvider>
      </CommentFormProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "deleteComment",
  },
} satisfies Meta<typeof DeleteCommentModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    commentId: 1,
  },
} satisfies Story;
