import { CommentForm } from "./CommentForm";
import { ToastRegion } from "@/components/ui/Toast";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentFormProvider } from "../CommentFormContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/comments/CommentForm",
  component: CommentForm,
  decorators: [
    (Story) => (
      <>
        <ToastRegion />
        <CommentFormProvider>
          <Story />
        </CommentFormProvider>
      </>
    ),
    withThemedBackground,
  ],
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
