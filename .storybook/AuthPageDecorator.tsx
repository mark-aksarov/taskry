import AppAuthLayout from "../app/[locale]/(auth)/layout";
import { type Decorator } from "@storybook/react";

export const AuthPageDecorator: Decorator = (Story) => {
  return (
    <AppAuthLayout>
      <Story />
    </AppAuthLayout>
  );
};
