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
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskListStory } from "@/components/tasks/TaskList/TaskList.stories";
import { AssignedTasksEmptyCard } from "@/components/tasks/AssignedTasks/AssignedTasksEmptyCard";

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
      page={1}
      pageSize={20}
      TotalProjectsCardContainer={() => (
        <TotalProjectsCard totalProjects={50} />
      )}
      TotalTasksCardContainer={() => <TotalTasksCard totalTasks={500} />}
      TotalUsersCardContainer={() => <TotalUsersCard totalUsers={15} />}
      TotalCustomersCardContainer={() => (
        <TotalCustomersCard totalCustomers={20} />
      )}
      AssignedTasksContainer={() => (
        <AssignedTasksSection>
          <AssignedTasksSectionHeading />
          <TaskList {...TaskListStory.args} />
        </AssignedTasksSection>
      )}
    />
  ),
};

export const Loading = {
  render: () => (
    <DashboardPage
      page={1}
      pageSize={20}
      TotalProjectsCardContainer={() => <TotalProjectsCardSkeleton />}
      TotalTasksCardContainer={() => <TotalTasksCardSkeleton />}
      TotalUsersCardContainer={() => <TotalUsersCardSkeleton />}
      TotalCustomersCardContainer={() => <TotalCustomersCardSkeleton />}
      AssignedTasksContainer={() => (
        <AssignedTasksSection>
          <AssignedTasksSectionHeading />
          <TaskList>
            <Repeat items={10} renderItem={() => <TaskListItemSkeleton />} />
          </TaskList>
        </AssignedTasksSection>
      )}
    />
  ),
} satisfies Story;

export const WithNoTasks = {
  render: () => (
    <DashboardPage
      page={1}
      pageSize={20}
      TotalProjectsCardContainer={() => (
        <TotalProjectsCard totalProjects={50} />
      )}
      TotalTasksCardContainer={() => <TotalTasksCard totalTasks={500} />}
      TotalUsersCardContainer={() => <TotalUsersCard totalUsers={15} />}
      TotalCustomersCardContainer={() => (
        <TotalCustomersCard totalCustomers={20} />
      )}
      AssignedTasksContainer={() => (
        <AssignedTasksSection>
          <AssignedTasksSectionHeading />
          <AssignedTasksEmptyCard />
        </AssignedTasksSection>
      )}
    />
  ),
} satisfies Story;
