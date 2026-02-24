import { Meta, StoryObj } from "@storybook/react";
import { TaskCategoryListItem } from "../TaskCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteTaskCategoryModalProvider } from "../../DeleteTaskCategoryModal/__stories__";

const meta = {
  title: "components/task-categories/TaskCategoryListItem",
  component: TaskCategoryListItem,
  decorators: [
    withSelectedItemsProvider,
    withDeleteTaskCategoryModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskCategoryListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Task Category 1",
    guestMode: false,
    updateTaskCategory: () => ({ status: "success" }),
  },
} satisfies Story;
