import { fn } from "storybook/test";
import { CustomerGridItem } from "./CustomerGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { EditCustomerForm } from "../EditCustomerForm";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { CustomerDetailBottomSheet } from "../CustomerDetailBottomSheet";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";
import { Default as EditCustomerFormStory } from "../EditCustomerForm/EditCustomerForm.stories";
import { Default as CustomerDetailModalStory } from "../CustomerDetailModal/CustomerDetailModal.stories";
import { Default as CustomerDetailBottomSheetStory } from "../CustomerDetailBottomSheet/CustomerDetailBottomSheet.stories";

const meta = {
  title: "Components/customers/CustomerGridItem",
  component: CustomerGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-full md:w-[300px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  render: (args) => (
    <CustomerGridItem
      {...args}
      menuTrigger={
        <CustomerItemActionMenuTrigger
          guestMode={false}
          customerId={args.id}
          customerFullName={args.fullName}
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
  ),
} satisfies Meta<typeof CustomerGridItem>;

export default meta;
type Story = StoryObj<typeof CustomerGridItem>;

export const Default = {
  args: {
    id: 1,
    fullName: "Sophia Turner",
    imageUrl: "/woman.jpg",
    email: "sophia.turner@example.com",
    phoneNumber: "+1-202-555-0101",
    publicLink: "https://company.com/customers/sophia",
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
    company: undefined,
  },
} satisfies Story;
