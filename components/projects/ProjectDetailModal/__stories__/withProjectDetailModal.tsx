import { type Decorator } from "@storybook/react";
import { ProjectDetailModalProvider } from "../ProjectDetailModalContext";

export const withProjectDetailModal: Decorator = (Story) => {
  return (
    <ProjectDetailModalProvider>
      <Story />
    </ProjectDetailModalProvider>
  );
};
