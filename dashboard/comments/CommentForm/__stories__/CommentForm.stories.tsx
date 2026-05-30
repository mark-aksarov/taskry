import { CommentForm } from "../CommentForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withCommentFormProvider } from "./withCommentFormProvider";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";

const meta = {
  title: "dashboard/comments/CommentForm",
  component: CommentForm,
  decorators: [
    withToastRegion,
    withCommentFormProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CommentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    action: () => {},
    isPending: false,
  },
} satisfies Story;
