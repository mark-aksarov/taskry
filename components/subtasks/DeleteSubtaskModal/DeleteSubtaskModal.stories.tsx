import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteSubtaskModal } from "../DeleteSubtaskModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteSubtaskProvider } from "../DeleteSubtaskProvider/__stories__";

const meta = {
  title: "components/subtasks/DeleteSubtaskModal",
  component: DeleteSubtaskModal,
  decorators: [
    withOpenModal,
    withDeleteSubtaskProvider,
    withToastRegion,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteSubtask",
  },
} satisfies Meta<typeof DeleteSubtaskModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    subtaskId: 1,
    subtaskText: "Fake subtask",
  },
} satisfies Story;
