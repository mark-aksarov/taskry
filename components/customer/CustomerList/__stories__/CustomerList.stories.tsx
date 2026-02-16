import { CustomerList } from "../CustomerList";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomerListItem } from "../../CustomerListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerListItemStory } from "../../CustomerListItem/__stories__";
import { withDeleteCustomerModalProvider } from "../../DeleteCustomerModal/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withEntityPaginationProvider } from "@/components/common/EntityContainerPagination/__stories__";

export const mockedCustomers = [
  {
    id: 1,
    fullName: "Customer 1",
    imageUrl: "/woman.jpg",
    email: "customer1@example.com",
    phoneNumber: "+10000000001",
    publicLink: "https://example.com/customer1",
    company: { id: 1, name: "Company 1" },
  },
  {
    id: 2,
    fullName: "Customer 2",
    imageUrl: "/man.jpg",
    email: "customer2@example.com",
    phoneNumber: "+10000000002",
    publicLink: "https://example.com/customer2",
    company: { id: 1, name: "Company 1" },
  },
  {
    id: 3,
    fullName: "Customer 3",
    imageUrl: "/woman.jpg",
    email: "customer3@example.com",
    phoneNumber: undefined,
    publicLink: undefined,
    company: { id: 2, name: "Company 2" },
  },
  {
    id: 4,
    fullName: "Customer 4",
    imageUrl: undefined,
    email: "customer4@example.com",
    phoneNumber: "+10000000004",
    publicLink: "https://example.com/customer4",
    company: { id: 2, name: "Company 2" },
  },
  {
    id: 5,
    fullName: "Customer 5",
    imageUrl: "/woman.jpg",
    email: "customer5@example.com",
    phoneNumber: "+10000000005",
    publicLink: "https://example.com/customer5",
    company: { id: 3, name: "Company 3" },
  },
];

const meta = {
  title: "components/customers/CustomerList",
  component: CustomerList,
  decorators: [
    withEntityPaginationProvider,
    withSelectedItemsProvider,
    withDeleteCustomerModalProvider,
    withThemedBackground,
  ],
  excludeStories: ["mockedCustomers"],
} satisfies Meta<typeof CustomerList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCustomers.map((customer) => (
      <CustomerListItem
        key={customer.id}
        {...CustomerListItemStory.args}
        {...customer}
      />
    )),
  },
} satisfies Story;
