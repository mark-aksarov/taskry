import React from "react";
import { type Decorator } from "@storybook/react";
import { ProjectDetailCompact } from "../ProjectDetailCompact";
import { ProjectDetailCompactSkeleton } from "../ProjectDetailCompact";
import { Default as ProjectDetailCompactStory } from "../ProjectDetailCompact/ProjectDetailCompact.stories";
import { ProjectDetailCompactClientContainerContext } from "./ProjectDetailCompactClientContainerContext";

export const withProjectDetailCompact: Decorator = (Story) => {
  return (
    <ProjectDetailCompactClientContainerContext.Provider
      value={() => <ProjectDetailCompact {...ProjectDetailCompactStory.args} />}
    >
      <Story />
    </ProjectDetailCompactClientContainerContext.Provider>
  );
};

export const withProjectDetailCompactSkeleton: Decorator = (Story) => {
  return (
    <ProjectDetailCompactClientContainerContext.Provider
      value={() => <ProjectDetailCompactSkeleton />}
    >
      <Story />
    </ProjectDetailCompactClientContainerContext.Provider>
  );
};
