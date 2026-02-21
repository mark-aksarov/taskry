import { TaskDetail } from "../TaskDetail";
import { TaskStatus } from "@/generated/prisma/enums";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { NewSubtaskModalTrigger } from "@/components/subtasks/NewSubtaskModalTrigger";
import { NewSubtaskModalTriggerStory } from "@/components/subtasks/NewSubtaskModalTrigger/__stories__";
import { withDeleteSubtaskModalProvider } from "@/components/subtasks/DeleteSubtaskModal/__stories__";

const meta = {
  title: "components/tasks/TaskDetail",
  component: TaskDetail,
  decorators: [withDeleteSubtaskModalProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Task 1",
    description: "Task description. General information goes here.",
    assignee: {
      id: "1",
      fullName: "User 1",
      imageUrl: "/man.jpg",
    },
    deadline: "2025-01-01",
    status: TaskStatus.active,
    creator: {
      id: "2",
      fullName: "User 2",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 1,
      title: "Project 1",
    },
    subtasksList: <SubtaskList {...SubtaskListStory.args} />,
    newSubtaskModalTrigger: (
      <NewSubtaskModalTrigger {...NewSubtaskModalTriggerStory.args} />
    ),
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    id: 1,
    title: "Task 1",
    deadline: "2025-01-01",
    status: TaskStatus.active,
    project: {
      id: 1,
      title: "Project 1",
    },
    newSubtaskModalTrigger: (
      <NewSubtaskModalTrigger {...NewSubtaskModalTriggerStory.args} />
    ),
  },
} satisfies Story;
