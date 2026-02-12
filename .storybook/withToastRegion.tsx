import { type Decorator } from "@storybook/react";
import { ToastRegion } from "../components/ui/Toast";

export const withToastRegion: Decorator = (Story) => {
  return (
    <>
      <ToastRegion />
      <Story />
    </>
  );
};
