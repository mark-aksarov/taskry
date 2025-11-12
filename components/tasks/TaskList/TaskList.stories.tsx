import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { TaskList } from "./TaskList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskListItem } from "../TaskListItem";
import { TaskDetail, TaskDetailContainerProvider } from "../TaskDetail";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { MockedTaskCommentsContainer } from "../TaskCommentsModalTrigger/TaskCommentsModalTrigger.stories";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";

const meta = {
  title: "Components/tasks/TaskList",
  component: TaskList,
  tags: ["autodocs"],
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
    withBackgroundVariant(),
  ],
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <TaskList>
        <TaskListItem
          id={1}
          title="Design landing page"
          deadline={new Date("2025-09-30")}
          project={{ id: 1, title: "Website Redesign" }}
          category={{ id: 1, name: "Design" }}
          status={{ id: 1, name: "Pending" }}
          creator={{ id: "user1", imageUrl: "/man.jpg", fullName: "John Doe" }}
          totalSubtasks={6}
          subtasksDone={2}
          commentsCount={10}
          subtasksCount={6}
          showCheckbox
        />

        <TaskListItem
          id={2}
          title="Implement login system"
          deadline={new Date("2025-10-05")}
          project={{ id: 2, title: "Authentication Module" }}
          category={{ id: 2, name: "Development" }}
          status={{ id: 2, name: "Active" }}
          creator={undefined}
          totalSubtasks={10}
          subtasksDone={7}
          commentsCount={22}
          subtasksCount={16}
          showCheckbox
        />

        <TaskListItem
          id={3}
          title="Database schema migration"
          deadline={new Date("2025-10-10")}
          project={{ id: 3, title: "Core Database Upgrade" }}
          category={{ id: 3, name: "Backend" }}
          status={{ id: 3, name: "Complete" }}
          creator={{ id: "user3", fullName: "Jane Doe" }}
          totalSubtasks={8}
          subtasksDone={4}
          commentsCount={2}
          subtasksCount={2}
          showCheckbox
        />

        <TaskListItem
          id={4}
          title="Write unit tests"
          deadline={new Date("2025-10-12")}
          project={{ id: 4, title: "Quality Assurance Suite" }}
          category={{ id: 4, name: "Testing" }}
          status={{ id: 1, name: "Pending" }}
          creator={{ id: "user4", imageUrl: "/man.jpg", fullName: "John Doe" }}
          totalSubtasks={12}
          subtasksDone={6}
          commentsCount={12}
          subtasksCount={32}
          showCheckbox
        />

        <TaskListItem
          id={5}
          title="Prepare deployment pipeline"
          deadline={new Date("2025-10-15")}
          project={{ id: 5, title: "CI/CD Automation" }}
          category={{ id: 5, name: "DevOps" }}
          status={{ id: 2, name: "Active" }}
          creator={{ id: "user5", imageUrl: "/man.jpg", fullName: "John Doe" }}
          totalSubtasks={21}
          subtasksDone={16}
          commentsCount={15}
          subtasksCount={8}
          showCheckbox
        />

        <TaskListItem
          id={6}
          title="Set up staging environment"
          deadline={new Date("2025-10-18")}
          project={{ id: 6, title: "Infrastructure Setup" }}
          category={{ id: 6, name: "Infrastructure" }}
          status={{ id: 3, name: "Complete" }}
          creator={{ id: "user6", imageUrl: "/man.jpg", fullName: "John Doe" }}
          totalSubtasks={11}
          subtasksDone={10}
          commentsCount={9}
          subtasksCount={16}
          showCheckbox
        />

        <TaskListItem
          id={7}
          title="Create onboarding flow"
          deadline={new Date("2025-10-20")}
          project={{ id: 7, title: "User Experience Improvements" }}
          category={{ id: 7, name: "UX" }}
          status={{ id: 3, name: "Complete" }}
          creator={{ id: "user7", imageUrl: "/man.jpg", fullName: "John Doe" }}
          totalSubtasks={7}
          subtasksDone={7}
          commentsCount={12}
          subtasksCount={22}
          showCheckbox
        />

        <TaskListItem
          id={8}
          title="Fix payment bug"
          deadline={new Date("2025-10-22")}
          project={{ id: 8, title: "E-commerce Platform" }}
          category={{ id: 8, name: "Bugfix" }}
          status={{ id: 2, name: "Active" }}
          creator={{ id: "user8", imageUrl: "/man.jpg", fullName: "John Doe" }}
          totalSubtasks={7}
          subtasksDone={5}
          commentsCount={10}
          subtasksCount={6}
          showCheckbox
        />

        <TaskListItem
          id={9}
          title="Optimize image loading"
          deadline={new Date("2025-10-25")}
          project={{ id: 9, title: "Performance Optimization" }}
          category={{ id: 9, name: "Performance" }}
          status={{ id: 1, name: "Pending" }}
          creator={{ id: "user9", fullName: "Jane Doe" }}
          totalSubtasks={7}
          subtasksDone={4}
          commentsCount={23}
          subtasksCount={12}
          showCheckbox
        />

        <TaskListItem
          id={10}
          title="Refactor auth middleware"
          deadline={new Date("2025-10-28")}
          project={{ id: 10, title: "Backend Refactoring" }}
          category={{ id: 3, name: "Backend" }}
          status={{ id: 3, name: "Complete" }}
          creator={undefined}
          totalSubtasks={21}
          subtasksDone={13}
          commentsCount={13}
          subtasksCount={23}
          showCheckbox
        />
      </TaskList>
    ),
  },
} satisfies Story;
