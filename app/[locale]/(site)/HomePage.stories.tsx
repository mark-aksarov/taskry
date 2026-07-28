import { HomePage } from "./HomePage";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withSiteLayout } from "@/.storybook/withSiteLayout";

const meta = {
  title: "pages/HomePage",
  component: HomePage,
  parameters: { layout: "fullscreen" },
  decorators: [withSiteLayout],
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
