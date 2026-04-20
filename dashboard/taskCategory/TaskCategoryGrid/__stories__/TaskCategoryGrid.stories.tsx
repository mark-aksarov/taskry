import { TaskCategoryGrid } from "../TaskCategoryGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoryGridExample } from "./TaskCategoryGridExample";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withDeleteTaskCategoriesProvider } from "../../DeleteTaskCategoriesProvider/__stories__";

const meta = {
  title: "dashboard/task-categories/TaskCategoryGrid",
  component: TaskCategoryGrid,
  decorators: [
    withDeleteTaskCategoriesProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskCategoryGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: <TaskCategoryGridExample />,
  },
} satisfies Story;
