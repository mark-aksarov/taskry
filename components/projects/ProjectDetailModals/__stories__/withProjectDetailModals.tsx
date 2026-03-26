import { type Decorator } from "@storybook/react";
import { MockedProjectDetailModals } from "./MockedProjectDetailModals";

export const withProjectDetailModals: Decorator = (Story) => {
  return (
    <>
      <Story />
      <MockedProjectDetailModals />
    </>
  );
};
