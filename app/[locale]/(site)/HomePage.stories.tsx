import { HomePage } from "./HomePage";
import { mocked } from "storybook/test";
import { SiteLayout } from "./SiteLayout";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

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
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
  args: {
    reset: () => {},
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
