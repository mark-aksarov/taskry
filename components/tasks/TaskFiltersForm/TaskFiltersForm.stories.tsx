import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskFiltersForm } from "./TaskFiltersForm";
import { getProjects } from "@/lib/queries/project";
import { taskCategoriesMock } from "../../../lib/data/__mocks__/taskCategories";
import { usersMock } from "@/lib/data/__mocks__/users";
import { getUsers } from "@/lib/queries/user";
import { UserCheckboxGroup } from "@/components/users/UserCheckboxGroup";
import { TaskCategoryCheckboxGroup } from "../TaskCategoryCheckboxGroup";
import { getTaskCategories } from "@/lib/queries/task";
import { projectsMock } from "@/components/projects/ProjectList";
import { ProjectCheckboxGroup } from "@/components/projects/ProjectCheckboxGroup";

const meta: Meta<typeof TaskFiltersForm> = {
  title: "Components/tasks/TaskFiltersForm",
  component: TaskFiltersForm,
  tags: ["autodocs"],
  beforeEach: () => {
    mocked(getTaskCategories).mockReturnValue(
      new Promise((res) => res(taskCategoriesMock)),
    );
    mocked(getProjects).mockReturnValue(
      new Promise((res) => res(projectsMock)),
    );
    mocked(getUsers).mockReturnValue(new Promise((res) => res(usersMock)));
  },
  render: (args) => {
    const categoriesPromise = getTaskCategories(1);
    const projectsPromise = getProjects();
    const usersPromise = getUsers(1);

    return (
      <TaskFiltersForm
        {...args}
        categoryCheckboxGroup={
          <TaskCategoryCheckboxGroup categoriesPromise={categoriesPromise} />
        }
        projectCheckboxGroup={
          <ProjectCheckboxGroup projectsPromise={projectsPromise} />
        }
        creatorCheckboxGroup={<UserCheckboxGroup usersPromise={usersPromise} />}
      />
    );
  },
} satisfies Meta<typeof TaskFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
