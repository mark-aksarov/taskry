import AppAuthLayout from "../app/(auth)/layout";
import { type Decorator } from "@storybook/react";

export const AuthPageDecorator: Decorator = (Story) => {
  return (
    <AppAuthLayout>
      <Story />
    </AppAuthLayout>
  );
};
