import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteTaskCategoryModal } from "./DeleteTaskCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  withModalManagerProvider,
  withOpenModal,
} from "@/components/common/ModalManagerContext/__stories__";
import { withDeleteTaskCategoryProvider } from "../DeleteTaskCategoryProvider/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/task-categories/DeleteTaskCategoryModal",
  component: DeleteTaskCategoryModal,
  decorators: [
    withOpenModal,
    withDeleteTaskCategoryProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "deleteTaskCategory",
  },
} satisfies Meta<typeof DeleteTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskCategoryId: 1,
    taskCategoryName: "Fake task category",
  },
} satisfies Story;
