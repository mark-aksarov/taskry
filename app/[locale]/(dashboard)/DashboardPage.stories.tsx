import {
  TotalProjectsCard,
  TotalProjectsCardSkeleton,
} from "@/components/projects/TotalProjectsCard";

import {
  AssignedTasksSection,
  AssignedTasksSectionHeading,
} from "@/components/tasks/AssignedTasks";

import {
  TotalTasksCard,
  TotalTasksCardSkeleton,
} from "@/components/tasks/TotalTasksCard";

import {
  TotalUsersCard,
  TotalUsersCardSkeleton,
} from "@/components/users/TotalUsersCard";
import { TaskListItemSkeleton } from "@/components/tasks/TaskListItem";

import {
  TotalCustomersCard,
  TotalCustomersCardSkeleton,
} from "@/components/customer/TotalCustomersCard";

import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { DashboardPage } from "./DashboardPage";
import { Repeat } from "@/components/common/Repeat";
import { TaskList } from "@/components/tasks/TaskList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskListItemsTemplate } from "@/components/tasks/TaskList/TaskList.stories";
import { AssignedTasksEmptyCard } from "@/components/tasks/AssignedTasks/AssignedTasksEmptyCard";
import { Default as TaskFormBaseStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";

const meta = {
  title: "components/pages/DashboardPage",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {
  render: () => (
    <DashboardPage
      totalProjectsCardContainer={<TotalProjectsCard totalProjects={50} />}
      totalTasksCardContainer={<TotalTasksCard totalTasks={500} />}
      totalUsersCardContainer={<TotalUsersCard totalUsers={15} />}
      totalCustomersCardContainer={<TotalCustomersCard totalCustomers={20} />}
      assignedTasksContainer={
        <AssignedTasksSection>
          <AssignedTasksSectionHeading />
          <TaskList
            showCheckbox={false}
            children={<TaskListItemsTemplate showCheckbox={false} />}
          />
        </AssignedTasksSection>
      }
    />
  ),
};
export const Loading = {
  render: () => (
    <DashboardPage
      totalProjectsCardContainer={<TotalProjectsCardSkeleton />}
      totalTasksCardContainer={<TotalTasksCardSkeleton />}
      totalUsersCardContainer={<TotalUsersCardSkeleton />}
      totalCustomersCardContainer={<TotalCustomersCardSkeleton />}
      assignedTasksContainer={
        <AssignedTasksSection>
          <AssignedTasksSectionHeading />
          <TaskList showCheckbox={false}>
            <Repeat
              items={10}
              renderItem={() => <TaskListItemSkeleton showCheckbox={false} />}
            />
          </TaskList>
        </AssignedTasksSection>
      }
    />
  ),
} satisfies Story;

export const WithNoTasks = {
  render: () => (
    <DashboardPage
      totalProjectsCardContainer={<TotalProjectsCard totalProjects={50} />}
      totalTasksCardContainer={<TotalTasksCard totalTasks={500} />}
      totalUsersCardContainer={<TotalUsersCard totalUsers={15} />}
      totalCustomersCardContainer={<TotalCustomersCard totalCustomers={20} />}
      assignedTasksContainer={
        <AssignedTasksSection>
          <AssignedTasksSectionHeading />
          <AssignedTasksEmptyCard
            newTaskFormContainer={<NewTaskForm {...TaskFormBaseStory.args} />}
          />
        </AssignedTasksSection>
      }
    />
  ),
} satisfies Story;
