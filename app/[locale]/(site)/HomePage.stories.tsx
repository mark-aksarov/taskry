import { HomePage } from "./HomePage";
import { mocked } from "storybook/test";
import { SiteLayout } from "./SiteLayout";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSessionProvider } from "@/common/SessionContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";

const meta = {
  title: "pages/HomePage",
  component: HomePage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <SiteLayout>
        <Story />
      </SiteLayout>
    ),
    withModalManagerProvider,
    withSessionProvider,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
  args: {
    signOut: async () => ({ status: "success" }),
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
