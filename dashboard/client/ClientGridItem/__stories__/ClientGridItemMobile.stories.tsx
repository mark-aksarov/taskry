import { mockedClientDetail } from "@/mocks/clients";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientGridItemMobile } from "../ClientGridItemMobile";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DeleteClientProvider } from "../../DeleteClientContext";
import { UpdateClientProvider } from "../../UpdateClientContext";
import { DeleteClientsProvider } from "../../DeleteClientsContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/ClientGridItemMobile",
  component: ClientGridItemMobile,
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
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof ClientGridItemMobile>;

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
