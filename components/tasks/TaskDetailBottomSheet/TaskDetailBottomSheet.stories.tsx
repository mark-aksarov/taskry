import {
  TaskDetailBottomSheet,
  TaskDetailBottomSheetProps,
} from "./TaskDetailBottomSheet";

import { useOverlayTrigger } from "react-aria";
import { Button } from "@/components/ui/Button";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetail, TaskDetailSkeleton } from "../TaskDetail";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";

const meta = {
  title: "components/tasks/TaskDetailBottomSheet",
  component: TaskDetailBottomSheet,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  args: {
    taskId: 1,
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
    <OverlayTriggerStateContext.Provider value={state}>
      <Button {...triggerProps} label="Open Task Detail" />
      <TaskDetailBottomSheet {...props} />
    </OverlayTriggerStateContext.Provider>
  );
};

export const Default = {
  args: {
    taskId: 1,
    taskDetailContainer: <TaskDetail {...TaskDetailStory.args} />,
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    taskId: 1,
    taskDetailContainer: <TaskDetailSkeleton />,
  },
} satisfies Story;
