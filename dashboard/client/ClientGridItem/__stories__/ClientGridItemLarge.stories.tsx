import { mockedClientDetail } from "@/mocks/clients";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientGridItemLarge } from "../ClientGridItemLarge";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withDeleteClientProvider } from "../../DeleteClientProvider/__stories__";
import { withUpdateClientProvider } from "../../UpdateClientProvider/__stories__";
import { withDeleteClientsProvider } from "../../DeleteClientsProvider/__stories__";
import { withSessionProvider } from "@/common/SessionContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/clients/ClientGridItemLarge",
  component: ClientGridItemLarge,
  decorators: [
    withUpdateClientProvider,
    withDeleteClientProvider,
    withDeleteClientsProvider,
    withSelectedItemsProvider,
    withSessionProvider,
    withModalManagerProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],

  parameters: {
    viewMode: "grid",
  },
} satisfies Meta<typeof ClientGridItemLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedClientDetail,
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    fullName: "This is a client name with a very long text for layout testing",
    email: "longemailaddressfortestingpurposes@exampledomainfortestemail.com",
    phoneNumber: "+1000000000000000000000000000000000000000000000000000",
    publicLink:
      "https://example.com/this-is-a-very-long-url-for-layout-testing",
  },
};

export const WithoutImagePhoneAndLink = {
  args: {
    id: mockedClientDetail.id,
    fullName: mockedClientDetail.fullName,
    email: mockedClientDetail.email,
  },
} satisfies Story;
