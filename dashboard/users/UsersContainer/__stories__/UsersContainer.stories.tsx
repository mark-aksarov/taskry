import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { UsersContainerPresentationExample } from "./UsersContainerPresentationExample";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/users/UsersContainer",
  component: UsersContainerPresentationExample,
  decorators: [
    withViewModeProvider,
    withPageTransitionProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UsersContainerPresentationExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <PageGrid>
      <UsersContainerPresentationExample />
    </PageGrid>
  ),
} satisfies Story;
