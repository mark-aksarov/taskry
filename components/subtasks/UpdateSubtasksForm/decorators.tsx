import React from "react";
import { type Decorator } from "@storybook/react";
import { UpdateSubtasksForm } from "./UpdateSubtasksForm";
import { SubtasksEmptySection } from "../SubtasksEmptySection";
import { UpdateSubtasksFormSkeleton } from "./UpdateSubtasksFormSkeleton";
import { Default as UpdateSubtasksFormStory } from "./UpdateSubtasksForm.stories";
import { UpdateSubtasksFormContainerProvider } from "./UpdateSubtasksFormContainerContext";

export const withUpdateSubtasksForm: Decorator = (Story) => {
  return (
    <UpdateSubtasksFormContainerProvider
      UpdateSubtasksFormContainer={() => (
        <UpdateSubtasksForm {...UpdateSubtasksFormStory.args} />
      )}
    >
      <Story />
    </UpdateSubtasksFormContainerProvider>
  );
};

export const withUpdateSubtasksFormEmpty: Decorator = (Story) => {
  return (
    <UpdateSubtasksFormContainerProvider
      UpdateSubtasksFormContainer={() => <SubtasksEmptySection />}
    >
      <Story />
    </UpdateSubtasksFormContainerProvider>
  );
};

export const withUpdateSubtasksFormSkeleton: Decorator = (Story) => {
  return (
    <UpdateSubtasksFormContainerProvider
      UpdateSubtasksFormContainer={() => <UpdateSubtasksFormSkeleton />}
    >
      <Story />
    </UpdateSubtasksFormContainerProvider>
  );
};
