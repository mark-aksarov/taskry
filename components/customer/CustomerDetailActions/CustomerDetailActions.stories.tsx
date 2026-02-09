import { fn } from "storybook/internal/test";
import { EditCustomerForm } from "../EditCustomerForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerDetailActions } from "../CustomerDetailActions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as EditCustomerFormStory } from "../EditCustomerForm/EditCustomerForm.stories";

const meta = {
  title: "components/customers/CustomerDetailActions",
  component: CustomerDetailActions,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerDetailActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    customerId: 1,
    customerFullName: "John Doe",
    deleteCustomer: fn(),
    editCustomerFormContainer: (
      <EditCustomerForm {...EditCustomerFormStory.args} />
    ),
  },
} satisfies Story;
