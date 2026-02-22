import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryToolbarActionsMenuTrigger } from "../TaskCategoryToolbarActionsMenuTrigger";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/task-categories/TaskCategoryToolbarActionsMenuTrigger",
  component: TaskCategoryToolbarActionsMenuTrigger,
  decorators: [
    withPageTransitionProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskCategoryToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    deleteTaskCategories: () => ({ status: "success" }),
  },
} satisfies Story;
