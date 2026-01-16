import { TaskDetailModal } from "./TaskDetailModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { TaskDetailSkeleton } from "../TaskDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";

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
    withThemedBackground,
  ],
  args: {
    taskId: 1,
  },
} satisfies Meta<typeof TaskDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          TaskDetailContainer: () => <TaskDetailSkeleton />,
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;
