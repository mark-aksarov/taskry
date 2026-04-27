import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoryListItem } from "../TaskCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskCategoryProviders } from "../../TaskCategoryProviders/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withDeleteTaskCategoryProvider } from "../../DeleteTaskCategoryProvider/__stories__";
import { withUpdateTaskCategoryProvider } from "../../UpdateTaskCategoryProvider/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withDeleteTaskCategoriesProvider } from "../../DeleteTaskCategoriesProvider/__stories__";

const meta = {
  title: "dashboard/task-categories/TaskCategoryListItem",
  component: TaskCategoryListItem,
  decorators: [
    withUpdateTaskCategoryProvider,
    withDeleteTaskCategoryProvider,
    withTaskCategoryProviders,
    withDeleteTaskCategoriesProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskCategoryListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Task Category 1",
  },
} satisfies Story;
