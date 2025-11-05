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
import { projectsMock } from "@/lib/data/__mocks__/projects";
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
  args: {
    categoryCheckboxGroup: (
      <TaskCategoryCheckboxGroup
        categoriesPromise={new Promise((res) => res(taskCategoriesMock))}
      />
    ),
    projectCheckboxGroup: (
      <ProjectCheckboxGroup
        projectsPromise={new Promise((res) => res(projectsMock))}
      />
    ),
    creatorCheckboxGroup: (
      <UserCheckboxGroup usersPromise={new Promise((res) => res(usersMock))} />
    ),
  },
} satisfies Meta<typeof TaskFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
