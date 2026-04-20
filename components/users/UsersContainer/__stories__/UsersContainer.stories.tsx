import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageGrid } from "@/components/common/PageGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { UsersContainerPresentationExample } from "./UsersContainerPresentationExample";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UsersContainer",
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
