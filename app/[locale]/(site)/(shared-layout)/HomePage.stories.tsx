import { HomePage } from "./HomePage";
import { mocked } from "storybook/test";
import { SiteLayout } from "./SiteLayout";
import { usePathname } from "next/navigation";
import { CtaSection } from "@/site/home/CtaSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";

const meta = {
  title: "pages/HomePage",
  component: HomePage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <SiteLayout isGuest={false} signOut={async () => ({ status: "success" })}>
        <Story />
      </SiteLayout>
    ),
    withModalManagerProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
  args: {
    ctaActionsContainer: (
      <CtaSection
        isGuest={false}
        signOut={async () => ({ status: "success" })}
        hasSession={true}
      />
    ),
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
