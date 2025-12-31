import React from "react";
import { EditTaskForm } from "../EditTaskForm";
import { type Decorator } from "@storybook/react";
import { Default as TaskFormBaseStory } from "../TaskFormBase/TaskFormBase.stories";
import { EditTaskFormClientContainerProvider } from "./EditTaskFormClientContainerContext";

export const withEditTaskForm: Decorator = (Story) => {
  return (
    <EditTaskFormClientContainerProvider
      value={() => <EditTaskForm {...TaskFormBaseStory.args} taskId={1} />}
    >
      <Story />
    </EditTaskFormClientContainerProvider>
  );
};
