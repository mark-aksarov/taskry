import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateSubtaskModal } from "../CreateSubtaskModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateSubtaskProvider } from "../CreateSubtaskProvider/__stories__";

const meta = {
  title: "dashboard/subtasks/CreateSubtaskModal",
  component: CreateSubtaskModal,
  decorators: [
    withOpenModal,
    withCreateSubtaskProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "createSubtask",
  },
} satisfies Meta<typeof CreateSubtaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: 1,
  },
} satisfies Story;
