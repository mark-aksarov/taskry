import { Meta, StoryObj } from "@storybook/react";
import { CustomerList } from "./CustomerList";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta: Meta<typeof CustomerList> = {
  title: "Components/customers/CustomerList",
  component: CustomerList,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof CustomerList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customers: [
      {
        id: 1,
        fullName: "Alice Johnson",
        imageUrl: "/woman.jpg",
        email: "alice.johnson@example.com",
        phoneNumber: "+1-202-555-0147",
        publicLink: "https://company.com/customers/alice",
        company: {
          id: 1,
          name: "TechCorp",
        },
      },
      {
        id: 2,
        fullName: "Bob Smith",
        imageUrl: "/man.jpg",
        email: "bob.smith@example.com",
        phoneNumber: "+1-202-555-0199",
        publicLink: "https://company.com/customers/bob",
        company: {
          id: 1,
          name: "TechCorp",
        },
      },
      {
        id: 3,
        fullName: "Clara Davis",
        imageUrl: "/woman.jpg",
        email: "clara.davis@example.com",
        phoneNumber: null,
        publicLink: null,
        company: {
          id: 2,
          name: "DesignStudio",
        },
      },
      {
        id: 4,
        fullName: "David Lee",
        imageUrl: null,
        email: "david.lee@example.com",
        phoneNumber: "+44-7700-900123",
        publicLink: "https://company.com/customers/david",
        company: {
          id: 2,
          name: "DesignStudio",
        },
      },
      {
        id: 5,
        fullName: "Emma Wilson",
        imageUrl: "/woman.jpg",
        email: "emma.wilson@example.com",
        phoneNumber: "+1-202-555-0173",
        publicLink: "https://company.com/customers/emma",
        company: {
          id: 3,
          name: "EcomWorld",
        },
      },
    ],
  },
} satisfies Story;
