import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { mockedTaskDetail } from "@/mocks/tasks";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskStatusModal } from "./UpdateTaskStatusModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskStatusAltProvider } from "../UpdateTaskStatusAltProvider/__stories__";

const meta = {
  title: "dashboard/tasks/UpdateTaskStatusModal",
  component: UpdateTaskStatusModal,
  decorators: [
    withOpenModal,
    withUpdateTaskStatusAltProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateTaskStatus",
  },
} satisfies Meta<typeof UpdateTaskStatusModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: mockedTaskDetail.id,
    taskStatus: mockedTaskDetail.status,
  },
} satisfies Story;
