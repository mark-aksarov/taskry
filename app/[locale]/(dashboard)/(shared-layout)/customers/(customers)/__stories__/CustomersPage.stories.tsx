import { mocked } from "storybook/test";
import CustomersPageLoading from "../loading";
import { usePathname } from "next/navigation";
import { CustomersPage } from "../CustomersPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerList } from "@/components/customer/CustomerList";
import { withCustomersPageModals } from "./withCustomersPageModals";
import { CustomerGridLarge } from "@/components/customer/CustomerGrid";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { CustomerGridMobile } from "@/components/customer/CustomerGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCustomersPageProviders } from "./withCustomersPageProviders";
import { CustomerListStory } from "@/components/customer/CustomerList/__stories__";
import { CustomerGridLargeStory } from "@/components/customer/CustomerGrid/__stories__";
import { CustomerGridMobileStory } from "@/components/customer/CustomerGrid/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";

const meta = {
  title: "pages/CustomersPage",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withCustomersPageModals,
    withCustomersPageProviders,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers");
  },
} satisfies Meta<typeof CustomersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    totalFilteredCustomers: 10,
    selectedSortField: "fullName",
    customersContainer: (
      <EntityContainerPresentation
        page={1}
        pageSize={3}
        listLarge={() => <CustomerList {...CustomerListStory.args} />}
        gridLarge={() => <CustomerGridLarge {...CustomerGridLargeStory.args} />}
        gridMobile={() => (
          <CustomerGridMobile {...CustomerGridMobileStory.args} />
        )}
        totalPages={3}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <CustomersPageLoading />,
} satisfies Story;

export const WithNoCustomers = {
  args: {
    ...Default.args,
    totalCount: 0,
  },
} satisfies Story;

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredCustomers: 0 },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
