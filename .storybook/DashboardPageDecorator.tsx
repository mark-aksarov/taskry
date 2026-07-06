import { type Decorator } from "@storybook/nextjs-vite";
import { ProfileLink } from "@/dashboard/layout/ProfileLink";
import { DashboardLayout } from "../app/[locale]/(dashboard)/DashboardLayout";
import { MockedCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";

/**
 * The page decorator is used to wrap the story in the page layout
 * Preserves the provider and layout structure
 */
export const DashboardPageDecorator: Decorator = (Story, context) => {
  const isGuest = context.parameters.isGuest || false;

  return (
    <MockedCurrentUserProvider isGuest={isGuest}>
      <DashboardLayout
        profileLinkContainer={
          <ProfileLink userId="user-1" fullName="User 1" imageUrl="/man.jpg" />
        }
        signOut={async () => ({ status: "success" })}
      >
        <Story />
      </DashboardLayout>
    </MockedCurrentUserProvider>
  );
};
