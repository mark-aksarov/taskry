import { type Decorator } from "@storybook/react";
import { DashboardLayout } from "../app/[locale]/(dashboard)/DashboardLayout";

export const PageDecorator: Decorator = (Story) => {
  return (
    <DashboardLayout>
      <Story />
    </DashboardLayout>
  );
};
