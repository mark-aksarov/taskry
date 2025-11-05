import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskModal } from "./NewTaskModal";
import { taskCategoriesMock } from "@/lib/data/__mocks__/taskCategories";
import { projectsMock } from "@/lib/data/__mocks__/projects";
import { usersMock } from "@/lib/data/__mocks__/users";
import { Button, RACDialogTrigger, Skeleton } from "@/components/ui";
import { Suspense } from "react";
import { NewTaskForm } from "../NewTaskForm";
import { TaskCategorySelect } from "../TaskCategorySelect";
import { ProjectSelect } from "@/components/projects/ProjectSelect";
import { UserSelect } from "@/components/users/UserSelect";

const meta = {
  title: "Components/tasks/NewTaskModal",
  component: NewTaskModal,
  tags: ["autodocs"],
  args: {
    newTaskForm: (
      <Suspense fallback={<Skeleton />}>
        <NewTaskForm
          taskCategorySelect={
            <TaskCategorySelect
              categoriesPromise={Promise.resolve(taskCategoriesMock)}
            />
          }
          projectSelect={
            <ProjectSelect projectsPromise={Promise.resolve(projectsMock)} />
          }
          assigneeSelect={
            <UserSelect usersPromise={Promise.resolve(usersMock)} />
          }
        />
      </Suspense>
    ),
  },
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="New task" />
        <Suspense>
          <Story />
        </Suspense>
      </RACDialogTrigger>
    ),
  ],
} satisfies Meta<typeof NewTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
