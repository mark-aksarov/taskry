import { Repeat } from "@/common/Repeat";
import { CommentList } from "../CommentList";
import { CommentItemSkeleton } from "../CommentItem";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { useModal } from "@/common/ModalManagerContext";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentFormProvider } from "../CommentFormContext";
import { EntityCommentsModal } from "./EntityCommentsModal";
import { SendCommentProvider } from "../SendCommentContext";
import { CommentsEmptySection } from "../CommentsEmptySection";
import { UpdateCommentProvider } from "../UpdateCommentContext";
import { CommentListExample } from "../CommentList/__stories__";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/comments/EntityCommentsModal",
  component: EntityCommentsModal,
  decorators: [
    withOpenModal,
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

  render: (args) => {
    const { isOpen, onOpenChange } = useModal("entityComments");
    return (
      <EntityCommentsModal
        {...args}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    );
  },

  parameters: {
    modalId: "entityComments",
  },
} satisfies Meta<typeof EntityCommentsModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: "Entity Comments",
    commentsContainer: <CommentListExample />,
  },
} satisfies Story;

export const WithEmptySection = {
  args: {
    ...Default.args,
    commentsContainer: <CommentsEmptySection />,
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    ...Default.args,
    commentsContainer: (
      <CommentList>
        <Repeat items={10} renderItem={CommentItemSkeleton} />
      </CommentList>
    ),
  },
} satisfies Story;
