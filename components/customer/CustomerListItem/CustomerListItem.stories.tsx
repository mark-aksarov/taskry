import { fn } from "storybook/test";
import { CustomerListItem } from "./CustomerListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { EditCustomerForm } from "../EditCustomerForm";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailBottomSheet } from "../CustomerDetailBottomSheet";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";
import { Default as CustomerFormBaseStory } from "../CustomerFormBase/CustomerFormBase.stories";
import { Default as CustomerDetailModalStory } from "../CustomerDetailModal/CustomerDetailModal.stories";
import { Default as CustomerDetailBottomSheetStory } from "../CustomerDetailBottomSheet/CustomerDetailBottomSheet.stories";

const meta = {
  title: "Components/customers/CustomerListItem",
  component: CustomerListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  render: (args) => (
    <CustomerListItem
      {...args}
      menuTrigger={
        <CustomerItemActionMenuTrigger
          customerId={args.id}
          customerFullName={args.fullName}
          deleteAction={fn()}
          editCustomerFormContainer={
            <EditCustomerForm {...CustomerFormBaseStory.args} />
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
  ),
} satisfies Meta<typeof CustomerListItem>;

export default meta;
type Story = StoryObj<typeof CustomerListItem>;

export const Default = {
  args: {
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
} satisfies Story;

export const WithoutImagePhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
    phoneNumber: undefined,
    publicLink: undefined,
  },
} satisfies Story;
