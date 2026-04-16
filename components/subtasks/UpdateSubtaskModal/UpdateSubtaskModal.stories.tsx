import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateSubtaskModal } from "./UpdateSubtaskModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateSubtaskProvider } from "../UpdateSubtaskProvider/__stories__";

const meta = {
  title: "components/subtasks/UpdateSubtaskModal",
  component: UpdateSubtaskModal,
  decorators: [
    withOpenModal,
    withUpdateSubtaskProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "updateSubtask",
  },
} satisfies Meta<typeof UpdateSubtaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    subtaskId: 1,
    taskId: 1,
    subtaskText: "Subtask placeholder text 1",
  },
} satisfies Story;
