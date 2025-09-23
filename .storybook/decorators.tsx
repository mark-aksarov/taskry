import { type Decorator } from "@storybook/react";
import React, { Suspense } from "react";
import { Layout } from "../app/layout";

export const PageDecorator: Decorator = (Story) => {
  return (
    <Suspense>
      <Layout>
        <Story />
      </Layout>
    </Suspense>
  );
};
