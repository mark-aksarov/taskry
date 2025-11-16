import { TaskGrid } from "./TaskGrid";
import { TaskGridItem } from "../TaskGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskDetail } from "@/components/tasks/TaskDetail/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsContainer/decorators";

const meta = {
  title: "Components/tasks/TaskGrid",
  component: TaskGrid,
  tags: ["autodocs"],
  decorators: [withTaskDetail, withTaskComments, withThemedBackground],
} satisfies Meta<typeof TaskGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <TaskGridItem
          id={1}
          title="Design homepage"
          deadline={new Date("2025-09-28")}
          assignee={{
            id: "user1",
            imageUrl: "/man.jpg",
            fullName: "Liam Turner",
          }}
          status={{
            id: "pending",
            name: "Pending",
          }}
          comments={99}
          subtasks={3}
          subtasksDone={1}
        />

        <TaskGridItem
          id={2}
          title="Implement authentication"
          deadline={new Date("2025-10-06")}
          assignee={undefined}
          status={{
            id: "active",
            name: "Active",
          }}
          comments={10}
          subtasks={4}
          subtasksDone={2}
        />

        <TaskGridItem
          id={3}
          title="Migrate database schema"
          deadline={new Date("2025-10-11")}
          assignee={{
            id: "user3",
            imageUrl: undefined,
            fullName: "Olivia White",
          }}
          status={{
            id: "pending",
            name: "Pending",
          }}
          comments={6}
          subtasks={2}
          subtasksDone={2}
        />

        <TaskGridItem
          id={4}
          title="Write automated tests"
          deadline={new Date("2025-10-13")}
          assignee={{
            id: "user4",
            imageUrl: "/man.jpg",
            fullName: "Ethan Green",
          }}
          status={{
            id: "completed",
            name: "Completed",
          }}
          comments={25}
          subtasks={4}
          subtasksDone={2}
        />

        <TaskGridItem
          id={5}
          title="Setup CI/CD pipeline"
          deadline={new Date("2025-10-16")}
          assignee={{
            id: "user5",
            imageUrl: "/man.jpg",
            fullName: "Mason Moore",
          }}
          status={{
            id: "pending",
            name: "Pending",
          }}
          comments={99}
          subtasks={4}
          subtasksDone={3}
        />

        <TaskGridItem
          id={6}
          title="Setup staging environment"
          deadline={new Date("2025-10-19")}
          assignee={{
            id: "user6",
            imageUrl: "/man.jpg",
            fullName: "Ava Black",
          }}
          status={{
            id: "active",
            name: "Active",
          }}
          comments={99}
          subtasks={3}
          subtasksDone={3}
        />

        <TaskGridItem
          id={7}
          title="Design onboarding flow"
          deadline={new Date("2025-10-21")}
          assignee={{
            id: "user7",
            imageUrl: "/man.jpg",
            fullName: "Isabella Hall",
          }}
          status={{
            id: "completed",
            name: "Completed",
          }}
          comments={47}
          subtasks={3}
          subtasksDone={3}
        />

        <TaskGridItem
          id={8}
          title="Fix checkout bug"
          deadline={new Date("2025-10-23")}
          assignee={{
            id: "user8",
            imageUrl: "/man.jpg",
            fullName: "Henry Young",
          }}
          status={{
            id: "pending",
            name: "Pending",
          }}
          comments={18}
          subtasks={3}
          subtasksDone={1}
        />

        <TaskGridItem
          id={9}
          title="Optimize image loading"
          deadline={new Date("2025-10-26")}
          assignee={{ id: "user9", imageUrl: undefined, fullName: "Ivy Adams" }}
          status={{
            id: "pending",
            name: "Pending",
          }}
          comments={67}
          subtasks={3}
          subtasksDone={1}
        />

        <TaskGridItem
          id={10}
          title="Refactor authentication middleware"
          deadline={new Date("2025-10-29")}
          assignee={undefined}
          status={{
            id: "active",
            name: "Active",
          }}
          comments={87}
          subtasks={3}
          subtasksDone={2}
        />
      </>
    ),
  },
} satisfies Story;
