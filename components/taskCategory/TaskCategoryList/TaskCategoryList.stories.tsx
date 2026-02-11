import { Meta, StoryObj } from "@storybook/react";
import { TaskCategoryList } from "./TaskCategoryList";
import { TaskCategoryListItem } from "../TaskCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryItemActionMenuTrigger } from "../TaskCategoryItemActionMenuTrigger";

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
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryList>;

export default meta;
type Story = StoryObj<typeof TaskCategoryList>;

export const Default = {
  args: {
    children: mockedTaskCategories.map((taskCategory) => (
      <TaskCategoryListItem
        key={taskCategory.id}
        id={taskCategory.id}
        name={taskCategory.name}
        menuTrigger={
          <TaskCategoryItemActionMenuTrigger
            guestMode={false}
            taskId={taskCategory.id}
            taskCategoryName={taskCategory.name}
          />
        }
      />
    )),
  },
} satisfies Story;
