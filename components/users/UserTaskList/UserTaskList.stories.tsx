import { UserTaskList } from "./UserTaskList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserTaskListItem } from "../UserTaskListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskDetailCompact } from "@/components/tasks/TaskDetailCompactClientContainer/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";

const meta = {
  title: "Components/users/UserTaskList",
  component: UserTaskList,
  decorators: [withTaskDetailCompact, withTaskComments, withThemedBackground],
} satisfies Meta<typeof UserTaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <UserTaskListItem
          id={1}
          title="Design landing page"
          deadline={new Date("2025-09-30")}
          status="pending"
          comments={10}
        />
        <UserTaskListItem
          id={2}
          title="Implement login system"
          deadline={new Date("2025-10-05")}
          status="active"
          comments={22}
        />
        <UserTaskListItem
          id={3}
          title="Database schema migration"
          deadline={new Date("2025-10-10")}
          status="completed"
          comments={2}
        />
        <UserTaskListItem
          id={4}
          title="Write unit tests"
          deadline={new Date("2025-10-12")}
          status="pending"
          comments={12}
        />
        <UserTaskListItem
          id={5}
          title="Prepare deployment pipeline"
          deadline={new Date("2025-10-15")}
          status="active"
          comments={15}
        />
        <UserTaskListItem
          id={6}
          title="Set up staging environment"
          deadline={new Date("2025-10-18")}
          status="completed"
          comments={9}
        />
        <UserTaskListItem
          id={7}
          title="Create onboarding flow"
          deadline={new Date("2025-10-20")}
          status="completed"
          comments={12}
        />
        <UserTaskListItem
          id={8}
          title="Fix payment bug"
          deadline={new Date("2025-10-22")}
          status="active"
          comments={10}
        />
        <UserTaskListItem
          id={9}
          title="Optimize image loading"
          deadline={new Date("2025-10-25")}
          status="pending"
          comments={23}
        />
        <UserTaskListItem
          id={10}
          title="Refactor auth middleware"
          deadline={new Date("2025-10-28")}
          status="completed"
          comments={13}
        />
      </>
    ),
  },
} satisfies Story;
