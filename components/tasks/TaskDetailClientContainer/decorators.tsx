import React from "react";
import { TaskDetail } from "../TaskDetail";
import { type Decorator } from "@storybook/react";
import { TaskDetailSkeleton } from "../TaskDetail";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";
import { TaskDetailClientContainerContext } from "../TaskDetailClientContainer";

export const withTaskDetail: Decorator = (Story) => {
  return (
    <TaskDetailClientContainerContext.Provider
      value={() => <TaskDetail {...TaskDetailStory.args} />}
    >
      <Story />
    </TaskDetailClientContainerContext.Provider>
  );
};

export const withTaskDetailSkeleton: Decorator = (Story) => {
  return (
    <TaskDetailClientContainerContext.Provider
      value={() => <TaskDetailSkeleton />}
    >
      <Story />
    </TaskDetailClientContainerContext.Provider>
  );
};
