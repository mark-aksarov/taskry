import { Button } from "@/components/ui";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  TaskDetailBottomSheet,
  TaskDetailBottomSheetProps,
} from "./TaskDetailBottomSheet";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  withTaskDetail,
  withTaskDetailSkeleton,
} from "@/components/tasks/TaskDetail/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsContainer/decorators";

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
  decorators: [withTaskDetail, withTaskComments],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [withTaskDetailSkeleton, withTaskComments],
} satisfies Story;
