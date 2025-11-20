import React from "react";
import {} from "../TaskDetailCompact";
import { type Decorator } from "@storybook/react";
import {
  TaskDetailCompact,
  TaskDetailCompactSkeleton,
} from "../TaskDetailCompact";
import { Default as TaskDetailCompactStory } from "../TaskDetailCompact/TaskDetailCompact.stories";
import { TaskDetailCompactClientContainerContext } from "./TaskDetailCompactClientContainerContext";

export const withTaskDetailCompact: Decorator = (Story) => {
  return (
    <TaskDetailCompactClientContainerContext.Provider
      value={() => <TaskDetailCompact {...TaskDetailCompactStory.args} />}
    >
      <Story />
    </TaskDetailCompactClientContainerContext.Provider>
  );
};

export const withTaskDetailCompactSkeleton: Decorator = (Story) => {
  return (
    <TaskDetailCompactClientContainerContext.Provider
      value={() => <TaskDetailCompactSkeleton />}
    >
      <Story />
    </TaskDetailCompactClientContainerContext.Provider>
  );
};
