import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { mockedTaskDetail } from "@/mocks/tasks";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskTitleModal } from "./UpdateTaskTitleModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskTitleProvider } from "../UpdateTaskTitleProvider/__stories__";

const meta = {
  title: "components/tasks/UpdateTaskTitleModal",
  component: UpdateTaskTitleModal,
  decorators: [
    withOpenModal,
    withUpdateTaskTitleProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateTaskTitle",
  },
} satisfies Meta<typeof UpdateTaskTitleModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: mockedTaskDetail.id,
    taskTitle: mockedTaskDetail.title,
  },
} satisfies Story;
