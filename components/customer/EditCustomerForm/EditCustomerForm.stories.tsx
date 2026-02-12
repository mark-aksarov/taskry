import { EditCustomerForm } from "./EditCustomerForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerCompanySelect } from "../CustomerCompanySelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as CustomerCompanySelectStory } from "../CustomerCompanySelect/CustomerCompanySelect.stories";
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
    fullNameDefaultValue: "John Doe",
    bioDefaultValue: "Frontend developer passionate about clean UI and DX.",
    emailDefaultValue: "john.doe@example.com",
    phoneNumberDefaultValue: "+1 555 123 4567",
    publicLinkDefaultValue: "https://example.com/john-doe",
    companySelect: (
      <CustomerCompanySelect {...CustomerCompanySelectStory.args} />
    ),
    updateCustomer: () => ({ status: "success" }),
  },
} satisfies Story;
