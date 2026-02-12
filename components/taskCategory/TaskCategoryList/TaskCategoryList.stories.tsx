import { Meta, StoryObj } from "@storybook/react";
import { TaskCategoryList } from "./TaskCategoryList";
import { TaskCategoryListItem } from "../TaskCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryListItemStory } from "../TaskCategoryListItem/__stories__";
import { TaskCategoryItemActionMenuTrigger } from "../TaskCategoryItemActionMenuTrigger";
import { TaskCategoryItemActionMenuTriggerStory } from "../TaskCategoryItemActionMenuTrigger/__stories__";

const mockedTaskCategories = [
  { id: 1, name: "Frontend" },
  { id: 2, name: "Backend" },
  { id: 3, name: "Testing" },
  { id: 4, name: "Documentation" },
  { id: 5, name: "Content" },
];

const meta = {
  title: "components/task-categories/TaskCategoryList",
  component: TaskCategoryList,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryList>;

export default meta;
type Story = StoryObj<typeof TaskCategoryList>;

export const Default = {
  args: {
    children: mockedTaskCategories.map((taskCategory) => (
      <TaskCategoryListItem
        {...TaskCategoryListItemStory.args}
        key={taskCategory.id}
        id={taskCategory.id}
        name={taskCategory.name}
        menuTrigger={
          <TaskCategoryItemActionMenuTrigger
            {...TaskCategoryItemActionMenuTriggerStory.args}
            taskCategoryId={taskCategory.id}
            taskCategoryName={taskCategory.name}
          />
        }
      />
    )),
  },
} satisfies Story;
