import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { DeleteTaskModal } from "../DeleteTaskModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTaskProvider } from "../DeleteTaskProvider/__stories__";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";

const meta = {
  title: "dashboard/tasks/DeleteTaskModal",
  component: DeleteTaskModal,
  decorators: [
    withOpenModal,
    withDeleteTaskProvider,
    withSelectedTasksProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "deleteTask",
  },
} satisfies Meta<typeof DeleteTaskModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: 1,
    taskTitle: "Task 1",
  },
} satisfies Story;
