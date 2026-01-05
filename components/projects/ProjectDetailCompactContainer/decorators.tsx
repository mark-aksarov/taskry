import React from "react";
import { type Decorator } from "@storybook/react";
import { ProjectDetailCompact } from "../ProjectDetailCompact";
import { ProjectDetailCompactSkeleton } from "../ProjectDetailCompact";
import { ProjectDetailCompactContainerContext } from "./ProjectDetailCompactContainerContext";
import { Default as ProjectDetailCompactStory } from "../ProjectDetailCompact/ProjectDetailCompact.stories";

export const withProjectDetailCompact: Decorator = (Story) => {
  return (
    <ProjectDetailCompactContainerContext.Provider
      value={() => <ProjectDetailCompact {...ProjectDetailCompactStory.args} />}
    >
      <Story />
    </ProjectDetailCompactContainerContext.Provider>
  );
};

export const withProjectDetailCompactSkeleton: Decorator = (Story) => {
  return (
    <ProjectDetailCompactContainerContext.Provider
      value={() => <ProjectDetailCompactSkeleton />}
    >
      <Story />
    </ProjectDetailCompactContainerContext.Provider>
  );
};
