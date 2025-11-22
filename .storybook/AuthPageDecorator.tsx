import { Layout } from "../app/(auth)/layout";
import { type Decorator } from "@storybook/react";

export const AuthPageDecorator: Decorator = (Story) => {
  return (
    <Layout>
      <Story />
    </Layout>
  );
};
