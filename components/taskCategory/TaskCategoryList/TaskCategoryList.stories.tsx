import { Meta, StoryObj } from "@storybook/react";
import { TaskCategoryList } from "./TaskCategoryList";
import { TaskCategoryListItem } from "../TaskCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryItemActionMenuTrigger } from "../TaskCategoryItemActionMenuTrigger";

const mockedTaskCategories = [
  { id: 1, name: "Frontend", workspaceId: 1 },
  { id: 2, name: "Backend", workspaceId: 1 },
  { id: 3, name: "Testing", workspaceId: 1 },
  { id: 4, name: "Documentation", workspaceId: 1 },
  { id: 5, name: "Content", workspaceId: 1 },
];

const meta = {
  title: "components/Task-categories/TaskCategoryList",
  component: TaskCategoryList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryList>;

export default meta;
type Story = StoryObj<typeof TaskCategoryList>;

export const Default = {
  args: {
    children: mockedTaskCategories.map((TaskCategory) => (
      <TaskCategoryListItem
        key={TaskCategory.id}
        id={TaskCategory.id}
        name={TaskCategory.name}
        menuTrigger={
          <TaskCategoryItemActionMenuTrigger
            guestMode={false}
            taskId={TaskCategory.id}
            taskCategoryName={TaskCategory.name}
          />
        }
      />
    )),
  },
} satisfies Story;
