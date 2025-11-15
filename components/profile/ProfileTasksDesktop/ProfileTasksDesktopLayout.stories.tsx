import {
  TaskDetail,
  TaskDetailContainerProvider,
} from "@/components/tasks/TaskDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileTasksDesktopLayout } from "./ProfileTasksDesktopLayout";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { Default as ProfileTaskListStory } from "../ProfileTaskList/ProfileTaskList.stories";
import { Default as TaskDetailStory } from "@/components/tasks/TaskDetail/TaskDetail.stories";
import { MockedCommentsContainer } from "@/components/comments/CommentsContainer";

const meta = {
  title: "components/profile/ProfileTasksDesktopLayout",
  component: ProfileTasksDesktopLayout,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TaskDetailContainerProvider
        TaskDetailContainer={() => <TaskDetail {...TaskDetailStory.args} />}
      >
        <CommentsContainerProvider
          CommentsContainer={() => <MockedCommentsContainer />}
        >
          <Story />
        </CommentsContainerProvider>
      </TaskDetailContainerProvider>
    ),
    withThemedBackground,
  ],
  globals: {
    viewport: { value: "tablet", isRotated: true },
  },
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProfileTasksDesktopLayout>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  parameters: { layout: "fullscreen" },
  args: {
    children: ProfileTaskListStory.args?.children,
  },
} satisfies Story;

export const Empty = {
  parameters: { layout: "centered" },
  args: {
    children: undefined,
  },
} satisfies Story;
