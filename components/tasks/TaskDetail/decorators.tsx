import React from "react";
import { TaskDetail } from "./TaskDetail";
import { type Decorator } from "@storybook/react";
import { Default as TaskDetailStory } from "./TaskDetail.stories";
import { TaskDetailContainerProvider } from "./TaskDetailContainerContext";
import { TaskDetailSkeleton } from "./TaskDetailSkeleton";

export const withTaskDetail: Decorator = (Story) => {
  return (
    <TaskDetailContainerProvider
      TaskDetailContainer={() => <TaskDetail {...TaskDetailStory.args} />}
    >
      <Story />
    </TaskDetailContainerProvider>
  );
};

export const withTaskDetailSkeleton: Decorator = (Story) => {
  return (
    <TaskDetailContainerProvider
      TaskDetailContainer={() => <TaskDetailSkeleton />}
    >
      <Story />
    </TaskDetailContainerProvider>
  );
};
