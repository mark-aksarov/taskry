import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailModal } from "./TaskDetailModal";
import { Button, RACDialogTrigger } from "@/components/ui";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "components/tasks/TaskDetailModal",
  component: TaskDetailModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="Task detail" />
        <Story />
      </RACDialogTrigger>
    ),
    withBackgroundVariant(),
  ],
  args: {
    taskId: 1,
  },
} satisfies Meta<typeof TaskDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
