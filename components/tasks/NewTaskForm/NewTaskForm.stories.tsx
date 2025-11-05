import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskForm } from "./NewTaskForm";
import { TaskCategorySelect } from "../TaskCategorySelect";
import { taskCategoriesMock } from "@/lib/data/__mocks__/taskCategories";
import { ProjectSelect } from "@/components/projects/ProjectSelect";
import { projectsMock } from "@/lib/data/__mocks__/projects";
import { UserSelect } from "@/components/users/UserSelect";
import { usersMock } from "@/lib/data/__mocks__/users";

const meta = {
  title: "components/tasks/NewTaskForm",
  component: NewTaskForm,
  tags: ["autodocs"],
  args: {
    taskCategorySelect: (
      <TaskCategorySelect
        categoriesPromise={Promise.resolve(taskCategoriesMock)}
      />
    ),
    projectSelect: (
      <ProjectSelect projectsPromise={Promise.resolve(projectsMock)} />
    ),
    assigneeSelect: <UserSelect usersPromise={Promise.resolve(usersMock)} />,
  },
  decorators: [
    (Story) => (
      <div className="w-[460px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NewTaskForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
