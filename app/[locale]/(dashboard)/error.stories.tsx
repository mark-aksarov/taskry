import error from "./error";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { withCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";

const meta = {
  title: "pages/DashboardErrorPage",
  component: error,
  parameters: { layout: "fullscreen" },
  decorators: [
    DashboardPageDecorator,
    withCurrentUserProvider,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/dashboard");
  },
  args: {
    reset: () => {},
  },
} satisfies Meta<typeof error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    error: new Error("Something went wrong"),
  },
} satisfies Story;
