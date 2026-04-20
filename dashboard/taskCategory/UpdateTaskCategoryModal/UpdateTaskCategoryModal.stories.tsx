import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskCategoryModal } from "./UpdateTaskCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskCategoryProvider } from "../UpdateTaskCategoryProvider/__stories__";

const meta = {
  title: "dashboard/task-categories/UpdateTaskCategoryModal",
  component: UpdateTaskCategoryModal,
  decorators: [
    withOpenModal,
    withUpdateTaskCategoryProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "updateTaskCategory",
  },
} satisfies Meta<typeof UpdateTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskCategoryId: 1,
    taskCategoryName: "Fake task Category",
  },
} satisfies Story;
