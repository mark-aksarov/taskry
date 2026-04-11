import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { mockedTaskDetail } from "@/mocks/tasks";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateTaskDescriptionModal } from "./UpdateTaskDescriptionModal";
import { withUpdateTaskDescriptionProvider } from "../UpdateTaskDescriptionProvider/__stories__";

const meta = {
  title: "components/tasks/UpdateTaskDescriptionModal",
  component: UpdateTaskDescriptionModal,
  decorators: [
    withOpenModal,
    withUpdateTaskDescriptionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateTaskDescription",
  },
} satisfies Meta<typeof UpdateTaskDescriptionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: mockedTaskDetail.id,
    taskDescription: mockedTaskDetail.title,
  },
} satisfies Story;
