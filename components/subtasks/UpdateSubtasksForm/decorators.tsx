import React from "react";
import { type Decorator } from "@storybook/react";
import { UpdateSubtasksForm } from "./UpdateSubtasksForm";
import { SubtasksEmptySection } from "../SubtasksEmptySection";
import { UpdateSubtasksFormSkeleton } from "./UpdateSubtasksFormSkeleton";
import { Default as UpdateSubtasksFormStory } from "./UpdateSubtasksForm.stories";
import { UpdateSubtasksFormContainerContext } from "./UpdateSubtasksFormContainerContext";

export const withUpdateSubtasksForm: Decorator = (Story) => {
  return (
    <UpdateSubtasksFormContainerContext.Provider
      value={() => <UpdateSubtasksForm {...UpdateSubtasksFormStory.args} />}
    >
      <Story />
    </UpdateSubtasksFormContainerContext.Provider>
  );
};

export const withUpdateSubtasksFormEmpty: Decorator = (Story) => {
  return (
    <UpdateSubtasksFormContainerContext.Provider
      value={() => <SubtasksEmptySection />}
    >
      <Story />
    </UpdateSubtasksFormContainerContext.Provider>
  );
};

export const withUpdateSubtasksFormSkeleton: Decorator = (Story) => {
  return (
    <UpdateSubtasksFormContainerContext.Provider
      value={() => <UpdateSubtasksFormSkeleton />}
    >
      <Story />
    </UpdateSubtasksFormContainerContext.Provider>
  );
};
