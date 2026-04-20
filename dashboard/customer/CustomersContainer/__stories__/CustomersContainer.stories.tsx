import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersProvider/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";
import { CustomersContainerPresentationExample } from "./CustomersContainerPresentationExample";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/customers/CustomersContainer",
  component: CustomersContainerPresentationExample,
  decorators: [
    withDeleteCustomersProvider,
    withViewModeProvider,
    withSelectedItemsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomersContainerPresentationExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <PageGrid>
      <CustomersContainerPresentationExample />
    </PageGrid>
  ),
} satisfies Story;
