import { fn } from "storybook/test";
import { CustomerList } from "./CustomerList";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomerListItem } from "../CustomerListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";

const mockedCustomers = [
  {
    id: 1,
    fullName: "Alice Johnson",
    imageUrl: "/woman.jpg",
    email: "alice.johnson@example.com",
    phoneNumber: "+1-202-555-0147",
    publicLink: "https://company.com/customers/alice",
    company: { id: 1, name: "TechCorp" },
  },
  {
    id: 2,
    fullName: "Bob Smith",
    imageUrl: "/man.jpg",
    email: "bob.smith@example.com",
    phoneNumber: "+1-202-555-0199",
    publicLink: "https://company.com/customers/bob",
    company: { id: 1, name: "TechCorp" },
  },
  {
    id: 3,
    fullName: "Clara Davis",
    imageUrl: "/woman.jpg",
    email: "clara.davis@example.com",
    phoneNumber: undefined,
    publicLink: undefined,
    company: { id: 2, name: "DesignStudio" },
  },
  {
    id: 4,
    fullName: "David Lee",
    imageUrl: undefined,
    email: "david.lee@example.com",
    phoneNumber: "+44-7700-900123",
    publicLink: "https://company.com/customers/david",
    company: { id: 2, name: "DesignStudio" },
  },
  {
    id: 5,
    fullName: "Emma Wilson",
    imageUrl: "/woman.jpg",
    email: "emma.wilson@example.com",
    phoneNumber: "+1-202-555-0173",
    publicLink: "https://company.com/customers/emma",
    company: { id: 3, name: "EcomWorld" },
  },
];

const meta = {
  title: "Components/customers/CustomerList",
  component: CustomerList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerList>;

export default meta;
type Story = StoryObj<typeof CustomerList>;

export const Default = {
  args: {
    children: mockedCustomers.map((customer) => (
      <CustomerListItem
        key={customer.id}
        {...customer}
        menuTrigger={
          <CustomerItemActionMenuTrigger
            customerId={customer.id}
            customerFullName={customer.fullName}
            deleteAction={fn()}
          />
        }
      />
    )),
  },
} satisfies Story;
