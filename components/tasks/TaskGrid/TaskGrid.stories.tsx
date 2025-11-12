import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGrid } from "./TaskGrid";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { TaskGridItem } from "../TaskGridItem";
import { TaskDetail, TaskDetailContainerProvider } from "../TaskDetail";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { MockedTaskCommentsContainer } from "../TaskCommentsModalTrigger/TaskCommentsModalTrigger.stories";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";

const meta = {
  title: "Components/tasks/TaskGrid",
  component: TaskGrid,
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
          creator={{
            id: "user1",
            imageUrl: "/man.jpg",
            fullName: "Liam Turner",
          }}
          totalSubtasks={3}
          subtasksDone={1}
        />

        <TaskGridItem
          id={2}
          title="Implement authentication"
          deadline={new Date("2025-10-06")}
          creator={undefined}
          totalSubtasks={4}
          subtasksDone={2}
        />

        <TaskGridItem
          id={3}
          title="Migrate database schema"
          deadline={new Date("2025-10-11")}
          creator={{
            id: "user3",
            imageUrl: undefined,
            fullName: "Olivia White",
          }}
          totalSubtasks={2}
          subtasksDone={2}
        />

        <TaskGridItem
          id={4}
          title="Write automated tests"
          deadline={new Date("2025-10-13")}
          creator={{
            id: "user4",
            imageUrl: "/man.jpg",
            fullName: "Ethan Green",
          }}
          totalSubtasks={4}
          subtasksDone={2}
        />

        <TaskGridItem
          id={5}
          title="Setup CI/CD pipeline"
          deadline={new Date("2025-10-16")}
          creator={{
            id: "user5",
            imageUrl: "/man.jpg",
            fullName: "Mason Moore",
          }}
          totalSubtasks={4}
          subtasksDone={3}
        />

        <TaskGridItem
          id={6}
          title="Setup staging environment"
          deadline={new Date("2025-10-19")}
          creator={{ id: "user6", imageUrl: "/man.jpg", fullName: "Ava Black" }}
          totalSubtasks={3}
          subtasksDone={3}
        />

        <TaskGridItem
          id={7}
          title="Design onboarding flow"
          deadline={new Date("2025-10-21")}
          creator={{
            id: "user7",
            imageUrl: "/man.jpg",
            fullName: "Isabella Hall",
          }}
          totalSubtasks={3}
          subtasksDone={3}
        />

        <TaskGridItem
          id={8}
          title="Fix checkout bug"
          deadline={new Date("2025-10-23")}
          creator={{
            id: "user8",
            imageUrl: "/man.jpg",
            fullName: "Henry Young",
          }}
          totalSubtasks={3}
          subtasksDone={1}
        />

        <TaskGridItem
          id={9}
          title="Optimize image loading"
          deadline={new Date("2025-10-26")}
          creator={{ id: "user9", imageUrl: undefined, fullName: "Ivy Adams" }}
          totalSubtasks={3}
          subtasksDone={1}
        />

        <TaskGridItem
          id={10}
          title="Refactor authentication middleware"
          deadline={new Date("2025-10-29")}
          creator={undefined}
          totalSubtasks={3}
          subtasksDone={2}
        />
      </>
    ),
  },
} satisfies Story;
