import { type Decorator } from "@storybook/react";
import { ProfileLink } from "@/components/layout/ProfileLink";
import { DashboardLayout } from "../app/[locale]/(dashboard)/DashboardLayout";
import SharedLayout from "@/app/[locale]/(dashboard)/(shared-layout)/SharedLayout";
import { MockedCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

/**
 * The page decorator is used to wrap the story in the page layout
 * Preserves the provider and layout structure
 */
export const SharedPageDecorator: Decorator = (Story, context) => {
  const isGuest = context.parameters.isGuest || false;

  return (
    <MockedCurrentUserProvider isGuest={isGuest}>
      <DashboardLayout>
        <SharedLayout
          profileLinkContainer={
            <ProfileLink fullName="User 1" imageUrl="/man.jpg" />
          }
        >
          <Story />
        </SharedLayout>
      </DashboardLayout>
    </MockedCurrentUserProvider>
  );
};
