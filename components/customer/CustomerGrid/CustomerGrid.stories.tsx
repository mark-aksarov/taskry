import { fn } from "storybook/test";
import { CustomerGrid } from "./CustomerGrid";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomerGridItem } from "../CustomerGridItem";
import { EditCustomerForm } from "../EditCustomerForm";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailBottomSheet } from "../CustomerDetailBottomSheet";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";
import { Default as EditCustomerFormStory } from "../EditCustomerForm/EditCustomerForm.stories";
import { Default as CustomerDetailModalStory } from "../CustomerDetailModal/CustomerDetailModal.stories";
import { Default as CustomerDetailBottomSheetStory } from "../CustomerDetailBottomSheet/CustomerDetailBottomSheet.stories";

const mockedCustomers = [
  {
    id: 1,
    fullName: "Sophia Turner",
    imageUrl: "/woman.jpg",
    email: "sophia.turner@example.com",
    phoneNumber: "+1-202-555-0101",
    publicLink: "https://company.com/customers/sophia",
    company: { id: 1, name: "TechCorp" },
  },
  {
    id: 2,
    fullName: "Liam Parker",
    imageUrl: "/man.jpg",
    email: "liam.parker@example.com",
    phoneNumber: "+1-202-555-0123",
    publicLink: "https://company.com/customers/liam",
    company: { id: 1, name: "TechCorp" },
  },
  {
    id: 3,
    fullName: "Olivia Hughes",
    imageUrl: "/woman.jpg",
    email: "olivia.hughes@example.com",
    phoneNumber: undefined,
    publicLink: undefined,
    company: { id: 2, name: "DesignStudio" },
  },
  {
    id: 4,
    fullName: "Ethan Collins",
    imageUrl: undefined,
    email: "ethan.collins@example.com",
    phoneNumber: "+44-7700-900101",
    publicLink: "https://company.com/customers/ethan",
    company: { id: 2, name: "DesignStudio" },
  },
  {
    id: 5,
    fullName: "Mia Foster",
    imageUrl: "/woman.jpg",
    email: "mia.foster@example.com",
    phoneNumber: "+1-202-555-0145",
    publicLink: "https://company.com/customers/mia",
    company: { id: 3, name: "EcomWorld" },
  },
];

const meta = {
  title: "Components/customers/CustomerGrid",
  component: CustomerGrid,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerGrid>;

export default meta;
type Story = StoryObj<typeof CustomerGrid>;

export const Default = {
  args: {
    children: mockedCustomers.map((customer) => (
      <CustomerGridItem
        key={customer.id}
        {...customer}
        menuTrigger={
          <CustomerItemActionMenuTrigger
            customerId={customer.id}
            customerFullName={customer.fullName}
            deleteAction={fn()}
            editCustomerFormContainer={
              <EditCustomerForm {...EditCustomerFormStory.args} />
            }
          />
        }
        customerDetailModal={
          <CustomerDetailModal {...CustomerDetailModalStory.args} />
        }
        customerDetailBottomSheet={
          <CustomerDetailBottomSheet {...CustomerDetailBottomSheetStory.args} />
        }
      />
    )),
  },
} satisfies Story;
