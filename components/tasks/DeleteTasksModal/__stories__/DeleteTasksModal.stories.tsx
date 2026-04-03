import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { DeleteTasksModal } from "../DeleteTasksModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTasksProvider } from "../../DeleteTasksProvider/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";

const meta = {
  title: "components/tasks/DeleteTasksModal",
  component: DeleteTasksModal,
  decorators: [
    withOpenModal,
    withDeleteTasksProvider,
    withSelectedTasksProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "deleteTasks",
  },
} satisfies Meta<typeof DeleteTasksModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
