import { CommentList } from "../CommentList";
import { CommentItem } from "../../CommentItem";
import { mockedCommentList } from "@/mocks/comments";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentItemStory } from "../../CommentItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSendCommentProvider } from "../../SendCommentProvider/__stories__";
import { withUpdateCommentProvider } from "../../UpdateCommentProvider/__stories__";
import { withDeleteCommentProvider } from "../../DeleteCommentProvider/__stories__";
import { withCommentFormProvider } from "@/components/comments/CommentForm/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";

const meta = {
  title: "components/comments/CommentList",
  tags: ["!dev"],
  component: CommentList,
  decorators: [
    withDeleteCommentProvider,
    withUpdateCommentProvider,
    withSendCommentProvider,
    withCommentFormProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCommentList.map((position) => (
      <CommentItem key={position.id} {...CommentItemStory.args} {...position} />
    )),
  },
} satisfies Story;
