import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { mockedTaskDetail } from "@/mocks/tasks";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskDeadlineModal } from "./UpdateTaskDeadlineModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskDeadlineProvider } from "../UpdateTaskDeadlineProvider/__stories__";

const meta = {
  title: "dashboard/tasks/UpdateTaskDeadlineModal",
  component: UpdateTaskDeadlineModal,
  decorators: [
    withOpenModal,
    withUpdateTaskDeadlineProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateTaskDeadline",
  },
} satisfies Meta<typeof UpdateTaskDeadlineModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: mockedTaskDetail.id,
    taskDeadline: mockedTaskDetail.deadline,
  },
} satisfies Story;
