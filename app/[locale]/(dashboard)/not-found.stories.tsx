import NotFound from "./not-found";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { DashboardLayout } from "./DashboardLayout";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";

const meta = {
  title: "pages/NotFoundPage",
  component: NotFound,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <DashboardLayout signOut={async () => ({ status: "success" })}>
        <Story />
      </DashboardLayout>
    ),
    withCurrentUserProvider,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/dashboard");
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
