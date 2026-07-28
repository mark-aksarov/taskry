import { mockedClientDetail } from "@/mocks/clients";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientGridItemLarge } from "../ClientGridItemLarge";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DeleteClientProvider } from "../../DeleteClientContext";
import { UpdateClientProvider } from "../../UpdateClientContext";
import { DeleteClientsProvider } from "../../DeleteClientsContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/ClientGridItemLarge",
  component: ClientGridItemLarge,
  decorators: [
    (Story) => (
      <ViewModeProvider initialValue="grid">
        <SelectedItemsProvider pageItems={[]}>
          <UpdateClientProvider>
            <DeleteClientProvider>
              <DeleteClientsProvider>
                <Story />
              </DeleteClientsProvider>
            </DeleteClientProvider>
          </UpdateClientProvider>
        </SelectedItemsProvider>
      </ViewModeProvider>
    ),
    withDashboardLayoutProviders,
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
