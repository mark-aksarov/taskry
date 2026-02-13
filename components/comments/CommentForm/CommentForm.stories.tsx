import { CommentForm } from "./CommentForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withCommentFormProvider } from "../withCommentFormProvider";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/comments/CommentForm",
  component: CommentForm,
  decorators: [withToastRegion, withCommentFormProvider, withThemedBackground],
} satisfies Meta<typeof CommentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    sendCommentAction: () => ({
      status: "error",
      errorCode: "validationError",
    }),
    mutateUrl: "/comments",
  },
} satisfies Story;
