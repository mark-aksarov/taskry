import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateTaskCategoryModal } from "../CreateTaskCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateTaskCategoryProvider } from "../CreateTaskCategoryProvider/__stories__";

const meta = {
  title: "dashboard/task-categories/CreateTaskCategoryModal",
  component: CreateTaskCategoryModal,
  decorators: [
    withOpenModal,
    withCreateTaskCategoryProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "createTaskCategory",
  },
} satisfies Meta<typeof CreateTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
