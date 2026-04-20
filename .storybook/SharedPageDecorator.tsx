import { type Decorator } from "@storybook/nextjs-vite";
import { ProfileLink } from "@/dashboard/layout/ProfileLink";
import { DashboardLayout } from "../app/[locale]/(dashboard)/DashboardLayout";
import SharedLayout from "@/app/[locale]/(dashboard)/(shared-layout)/SharedLayout";
import { MockedCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { ModalManagerProvider } from "@/dashboard/common/ModalManagerContext";

/**
 * The page decorator is used to wrap the story in the page layout
 * Preserves the provider and layout structure
 */
export const SharedPageDecorator: Decorator = (Story, context) => {
  const isGuest = context.parameters.isGuest || false;

  return (
    <ModalManagerProvider>
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
    </ModalManagerProvider>
  );
};
