import { Meta, StoryObj } from "@storybook/react";
import { TaskCategoryList } from "../TaskCategoryList";
import { TaskCategoryListItem } from "../../TaskCategoryListItem";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryListItemStory } from "../../TaskCategoryListItem/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteTaskCategoriesProvider } from "../../DeleteTaskCategoriesContext/__stories__";

const meta = {
  title: "components/task-categories/TaskCategoryList",
  component: TaskCategoryList,
  decorators: [
    withDeleteTaskCategoriesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskCategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedTaskCategorySummaries.map((taskCategory) => (
      <TaskCategoryListItem
        key={taskCategory.id}
        {...TaskCategoryListItemStory.args}
        {...taskCategory}
      />
    )),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
