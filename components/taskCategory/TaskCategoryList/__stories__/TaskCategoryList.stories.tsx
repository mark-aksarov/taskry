import { Meta, StoryObj } from "@storybook/react";
import { TaskCategoryList } from "../TaskCategoryList";
import { TaskCategoryListItem } from "../../TaskCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryListItemStory } from "../../TaskCategoryListItem/__stories__";

const mockedTaskCategories = [
  { id: 1, name: "Task Category 1" },
  { id: 2, name: "Task Category 2" },
  { id: 3, name: "Task Category 3" },
  { id: 4, name: "Task Category 4" },
  { id: 5, name: "Task Category 5" },
];

const meta = {
  title: "components/task-categories/TaskCategoryList",
  component: TaskCategoryList,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedTaskCategories.map((taskCategory) => (
      <TaskCategoryListItem
        key={taskCategory.id}
        {...TaskCategoryListItemStory.args}
        {...taskCategory}
      />
    )),
  },
} satisfies Story;
