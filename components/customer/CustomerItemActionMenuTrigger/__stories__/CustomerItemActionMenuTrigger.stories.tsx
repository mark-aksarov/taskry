import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditCustomerForm } from "../../EditCustomerForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditCustomerFormStory } from "../../EditCustomerForm/__stories__";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";

const meta = {
  title: "components/customers/CustomerItemActionMenuTrigger",
  component: CustomerItemActionMenuTrigger,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerItemActionMenuTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    guestMode: false,
    customerId: 1,
    customerFullName: "Customer 1",
    deleteAction: () => ({ status: "success" }),
    editCustomerFormContainer: (
      <EditCustomerForm {...EditCustomerFormStory.args} />
    ),
  },
};
