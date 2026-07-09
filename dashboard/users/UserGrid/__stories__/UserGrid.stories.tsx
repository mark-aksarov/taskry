import { UserGridExample } from "./UserGridExample";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/users/UserGrid",
  component: UserGridExample,
  decorators: [
    withViewModeProvider,
    withPageTransitionProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserGridExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <DashboardGrid>
      <UserGridExample />
    </DashboardGrid>
  ),
} satisfies Story;
