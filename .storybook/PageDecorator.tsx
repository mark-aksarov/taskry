import { type Decorator } from "@storybook/react";
import DashboardTemplate from "@/app/[locale]/(dashboard)/DashboardTemplate";
import { DashboardLayout } from "../app/[locale]/(dashboard)/DashboardLayout";

export const PageDecorator: Decorator = (Story) => {
  return (
    <DashboardLayout>
      <DashboardTemplate>
        <Story />
      </DashboardTemplate>
    </DashboardLayout>
  );
};
