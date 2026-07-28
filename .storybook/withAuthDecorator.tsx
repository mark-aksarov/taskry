import AppAuthLayout from "../app/[locale]/(auth)/layout";
import { type Decorator } from "@storybook/nextjs-vite";

export const withAuthDecorator: Decorator = (Story) => {
  return (
    <AppAuthLayout>
      <Story />
    </AppAuthLayout>
  );
};
