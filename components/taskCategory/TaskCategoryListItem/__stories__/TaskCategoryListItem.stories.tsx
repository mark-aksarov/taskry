import { Meta, StoryObj } from "@storybook/react";
import { TaskCategoryListItem } from "../TaskCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteTaskCategoriesProvider } from "../../DeleteTaskCategoriesProvider/__stories__";
import { withTaskCategoryProviders } from "../../TaskCategoryProviders/__stories__";

const meta = {
  title: "components/task-categories/TaskCategoryListItem",
  component: TaskCategoryListItem,
  decorators: [
    withTaskCategoryProviders,
    withDeleteTaskCategoriesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
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

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
