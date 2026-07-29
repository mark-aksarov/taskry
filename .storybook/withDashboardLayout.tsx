import { mockedSession } from "@/mocks/session";
import { RoleProvider } from "@/common/RoleContext";
import { type Decorator } from "@storybook/nextjs-vite";
import { SessionProvider } from "@/common/SessionContext";
import { ProfileLink } from "@/dashboard/layout/ProfileLink";
import { DashboardLayout } from "@/app/[locale]/(dashboard)/DashboardLayout";

export const withDashboardLayout: Decorator = (Story) => {
  return (
    <SessionProvider value={mockedSession}>
      <RoleProvider value="owner">
        <DashboardLayout
          profileLinkContainer={
            <ProfileLink
              userId="user-1"
              fullName="User 1"
              imageUrl="/man.jpg"
            />
          }
        >
          <Story />
        </DashboardLayout>
      </RoleProvider>
    </SessionProvider>
  );
};
