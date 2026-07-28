import { ToastRegion } from "@/ui/Toast";
import { CommentForm } from "../CommentForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentFormProvider } from "../CommentFormContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/comments/CommentForm",
  component: CommentForm,
  decorators: [
    (Story) => (
      <CommentFormProvider entityId={1} entityKey="task" mutateUrl="">
        <Story />
        <ToastRegion />
      </CommentFormProvider>
    ),

    withDashboardLayoutProviders,
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
