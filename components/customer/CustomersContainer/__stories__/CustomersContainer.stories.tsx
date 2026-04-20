import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageGrid } from "@/components/common/PageGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { CustomersContainerPresentationExample } from "./CustomersContainerPresentationExample";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomersContainer",
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
