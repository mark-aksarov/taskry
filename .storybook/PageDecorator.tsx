import { type Decorator } from "@storybook/react";
import { ProfileLink } from "@/components/layout/ProfileLink";
import { DashboardLayout } from "../app/[locale]/(dashboard)/DashboardLayout";
import DashboardTemplate from "@/app/[locale]/(dashboard)/(shared-layout)/SharedLayout";

export const PageDecorator: Decorator = (Story) => {
  return (
    <DashboardLayout>
      <DashboardTemplate
        profileLinkContainer={
          <ProfileLink fullName="User 1" imageUrl="/man.jpg" />
        }
      >
        <Story />
      </DashboardTemplate>
    </DashboardLayout>
  );
};
