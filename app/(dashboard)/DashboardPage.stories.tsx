import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardPage } from "./DashboardPage";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import {
  TotalProjectsCard,
  TotalProjectsCardSkeleton,
} from "@/components/dashboard/TotalProjectsCard";
import {
  AssignedTasksSection,
  AssignedTasksSectionHeading,
} from "@/components/tasks/AssignedTasks";
import {
  TotalTasksCard,
  TotalTasksCardSkeleton,
} from "@/components/dashboard/TotalTasksCard";
import { Repeat } from "@/components/common/Repeat";
import { TaskList } from "@/components/tasks/TaskList";
import { TotalUsersCard } from "@/components/dashboard/TotalUsersCard";
import { TaskListItemSkeleton } from "@/components/tasks/TaskListItem";
import { TotalCustomersCard } from "@/components/dashboard/TotalCustomersCard";
import { Default as TaskListStory } from "@/components/tasks/TaskList/TaskList.stories";
import { AssignedTasksEmptyCard } from "@/components/tasks/AssignedTasks/AssignedTasksEmptyCard";
import {
  TaskDetail,
  TaskDetailContainerProvider,
} from "@/components/tasks/TaskDetail";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { MockedTaskCommentsContainer } from "@/components/tasks/TaskCommentsModalTrigger/TaskCommentsModalTrigger.stories";
import { Default as TaskDetailStory } from "@/components/tasks/TaskDetail/TaskDetail.stories";

const meta = {
  title: "components/pages/DashboardPage",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <TaskDetailContainerProvider
        TaskDetailContainer={() => <TaskDetail {...TaskDetailStory.args} />}
      >
        <CommentsContainerProvider
          CommentsContainer={() => <MockedTaskCommentsContainer />}
        >
          <Story />
        </CommentsContainerProvider>
      </TaskDetailContainerProvider>
    ),
    PageDecorator,
    withBackgroundVariant(),
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {
  render: () => (
    <DashboardPage
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
      TotalProjectsCardContainer={() => <TotalProjectsCardSkeleton />}
      TotalTasksCardContainer={() => <TotalTasksCardSkeleton />}
      TotalUsersCardContainer={() => <TotalUsersCard />}
      TotalCustomersCardContainer={() => <TotalCustomersCard />}
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
