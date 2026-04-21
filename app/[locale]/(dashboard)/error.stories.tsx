import error from "./error";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { DashboardLayout } from "./DashboardLayout";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "pages/ErrorPage",
  component: error,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <DashboardLayout>
        <Story />
      </DashboardLayout>
    ),
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
