import { mockedSession } from "@/mocks/session";
import { type Decorator } from "@storybook/nextjs-vite";
import { SessionProvider } from "@/common/SessionContext";
import { SiteLayout } from "@/app/[locale]/(site)/SiteLayout";

export const withSiteLayout: Decorator = (Story) => {
  return (
    <SessionProvider value={mockedSession}>
      <SiteLayout>
        <Story />
      </SiteLayout>
    </SessionProvider>
  );
};
