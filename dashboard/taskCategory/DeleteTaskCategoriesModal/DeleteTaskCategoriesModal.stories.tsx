import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { DeleteTaskCategoriesModal } from "./DeleteTaskCategoriesModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTaskCategoriesProvider } from "../DeleteTaskCategoriesProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/task-categories/DeleteTaskCategoriesModal",
  component: DeleteTaskCategoriesModal,
  decorators: [
    withOpenModal,
    withDeleteTaskCategoriesProvider,
    withSelectedItemsProvider,
    withToastRegion,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "deleteTaskCategories",
  },
} satisfies Meta<typeof DeleteTaskCategoriesModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
