import {
  TaskDetailCompact,
  TaskDetailCompactSkeleton,
} from "../TaskDetailCompact";

import React from "react";
import { type Decorator } from "@storybook/react";
import { TaskDetailCompactContainerContext } from "./TaskDetailCompactContainerContext";
import { Default as TaskDetailCompactStory } from "../TaskDetailCompact/TaskDetailCompact.stories";

export const withTaskDetailCompact: Decorator = (Story) => {
  return (
    <TaskDetailCompactContainerContext.Provider
      value={() => <TaskDetailCompact {...TaskDetailCompactStory.args} />}
    >
      <Story />
    </TaskDetailCompactContainerContext.Provider>
  );
};

export const withTaskDetailCompactSkeleton: Decorator = (Story) => {
  return (
    <TaskDetailCompactContainerContext.Provider
      value={() => <TaskDetailCompactSkeleton />}
    >
      <Story />
    </TaskDetailCompactContainerContext.Provider>
  );
};
