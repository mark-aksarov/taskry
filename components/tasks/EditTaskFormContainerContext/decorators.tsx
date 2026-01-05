import React from "react";
import { EditTaskForm } from "../EditTaskForm";
import { type Decorator } from "@storybook/react";
import { EditTaskFormContainerProvider } from "./EditTaskFormContainerContext";
import { Default as TaskFormBaseStory } from "../TaskFormBase/TaskFormBase.stories";

export const withEditTaskForm: Decorator = (Story) => {
  return (
    <EditTaskFormContainerProvider
      value={() => <EditTaskForm {...TaskFormBaseStory.args} taskId={1} />}
    >
      <Story />
    </EditTaskFormContainerProvider>
  );
};
