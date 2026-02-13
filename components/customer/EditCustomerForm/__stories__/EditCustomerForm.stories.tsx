import { EditCustomerForm } from "../EditCustomerForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerCompanySelect } from "../../CustomerCompanySelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerCompanySelectStory } from "../../CustomerCompanySelect/__stories__";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/customers/EditCustomerForm",
  component: EditCustomerForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof EditCustomerForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerId: 1,
    fullNameDefaultValue: "Customer 1",
    bioDefaultValue: "Sample bio text. Placeholder content only.",
    emailDefaultValue: "customer1@example.com",
    phoneNumberDefaultValue: "+10000000001",
    publicLinkDefaultValue: "https://example.com/customer1",
    companySelect: (
      <CustomerCompanySelect {...CustomerCompanySelectStory.args} />
    ),
    updateCustomer: () => ({ status: "success" }),
  },
} satisfies Story;
