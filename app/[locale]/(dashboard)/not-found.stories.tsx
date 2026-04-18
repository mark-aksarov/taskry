import NotFound from "./not-found";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { DashboardLayout } from "./DashboardLayout";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "pages/NotFoundPage",
  component: NotFound,
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
    mocked(usePathname).mockReturnValue("/");
  },
  args: {
    reset: () => {},
  },
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    error: new Error("Something went wrong"),
  },
} satisfies Story;
