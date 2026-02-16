import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditCustomerForm } from "../../EditCustomerForm";
import { CustomerDetailActions } from "../CustomerDetailActions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditCustomerFormStory } from "../../EditCustomerForm/__stories__";

const meta = {
  title: "components/customers/CustomerDetailActions",
  component: CustomerDetailActions,
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
    deleteCustomer: () => ({ status: "success" }),
    editCustomerFormContainer: (
      <EditCustomerForm {...EditCustomerFormStory.args} />
    ),
  },
} satisfies Story;
