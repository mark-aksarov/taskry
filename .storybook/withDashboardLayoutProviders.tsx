import { mockedSession } from "@/mocks/session";
import { RoleProvider } from "@/common/RoleContext";
import { type Decorator } from "@storybook/nextjs-vite";
import { SessionProvider } from "@/common/SessionContext";
import { SearchBarProvider } from "@/dashboard/search/SearchBar";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { DemoDataProvider } from "@/dashboard/demoData/DemoDataContext";
import { PageTransitionProvider } from "@/dashboard/common/PageTransitionContext";

export const withDashboardLayoutProviders: Decorator = (Story) => {
  return (
    <SessionProvider value={mockedSession}>
      <RoleProvider value="owner">
        <ModalManagerProvider key="/dashboard">
          <PageTransitionProvider>
            <SearchBarProvider key="/dashboard" initialValue="">
              <DemoDataProvider>
                <Story />
              </DemoDataProvider>
            </SearchBarProvider>
          </PageTransitionProvider>
        </ModalManagerProvider>
      </RoleProvider>
    </SessionProvider>
  );
};
