import { Meta, StoryObj } from "@storybook/react";
import { TaskCategoryList } from "../TaskCategoryList";
import { TaskCategoryListItem } from "../../TaskCategoryListItem";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryListItemStory } from "../../TaskCategoryListItem/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/task-categories/TaskCategoryList",
  component: TaskCategoryList,
  decorators: [withSelectedItemsProvider, withThemedBackground],
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
