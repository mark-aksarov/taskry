import { type Decorator } from "@storybook/nextjs-vite";
import { ToastRegion } from "../components/ui/Toast";

export const withToastRegion: Decorator = (Story) => {
  return (
    <>
      <ToastRegion />
      <Story />
    </>
  );
};
