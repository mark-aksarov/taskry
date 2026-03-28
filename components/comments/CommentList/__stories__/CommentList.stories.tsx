import { CommentList } from "../CommentList";
import { CommentItem } from "../../CommentItem";
import { Meta, StoryObj } from "@storybook/react";
import { mockedCommentList } from "@/mocks/comments";
import { CommentItemStory } from "../../CommentItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSendCommentProvider } from "../../SendCommentContext/__stories__";
import { withUpdateCommentProvider } from "../../UpdateCommentContext/__stories__";
import { withCommentFormProvider } from "@/components/comments/CommentForm/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

const meta = {
  title: "components/comments/CommentList",
  tags: ["!dev"],
  component: CommentList,
  decorators: [
    withUpdateCommentProvider,
    withSendCommentProvider,
    withCommentFormProvider,
    withCurrentUserProvider,
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
