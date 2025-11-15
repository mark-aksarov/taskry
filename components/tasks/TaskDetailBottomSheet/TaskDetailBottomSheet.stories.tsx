import { Button } from "@/components/ui";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetail, TaskDetailSkeleton } from "../TaskDetail";
import {
  TaskDetailBottomSheet,
  TaskDetailBottomSheetProps,
} from "./TaskDetailBottomSheet";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";
import { TaskDetailContainerProvider } from "../TaskDetail/TaskDetailContainerContext";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { MockedCommentsContainer } from "@/components/comments/CommentsContainer";

const meta = {
  title: "components/tasks/TaskDetailBottomSheet",
  component: TaskDetailBottomSheet,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  args: {
    taskId: 1,
    state: {
      isOpen: true,
      setOpen: () => {},
      open: () => {},
      close: () => {},
      toggle: () => {},
    },
  },
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
  render: (args) => <TaskDetailBottomSheetTemplate {...args} />,
} satisfies Meta<typeof TaskDetailBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const TaskDetailBottomSheetTemplate = ({
  ...props
}: TaskDetailBottomSheetProps) => {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <Button {...triggerProps} label="Open Task Detail" />
      <TaskDetailBottomSheet {...props} state={state} />
    </>
  );
};

export const Default = {
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
  ],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <TaskDetailContainerProvider
        TaskDetailContainer={() => <TaskDetailSkeleton />}
      >
        <CommentsContainerProvider
          CommentsContainer={() => <MockedCommentsContainer />}
        >
          <Story />
        </CommentsContainerProvider>
      </TaskDetailContainerProvider>
    ),
  ],
} satisfies Story;
