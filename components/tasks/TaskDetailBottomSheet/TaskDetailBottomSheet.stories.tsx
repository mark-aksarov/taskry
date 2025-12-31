import {
  TaskDetailBottomSheet,
  TaskDetailBottomSheetProps,
} from "./TaskDetailBottomSheet";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

import { Button } from "@/components/ui";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withTaskDetailCompactSkeleton } from "@/components/tasks/TaskDetailCompactClientContainer/decorators";

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

export const Default = {} satisfies Story;

export const WithSkeletonContent = {
  decorators: [withTaskDetailCompactSkeleton],
} satisfies Story;
