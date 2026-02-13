import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewCustomerForm } from "../../NewCustomerForm";
import { NewCompanyForm } from "@/components/company/NewCompanyForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NewCustomerFormStory } from "../../NewCustomerForm/__stories__";
import { NewCompanyFormStory } from "@/components/company/NewCompanyForm/__stories__";
import { CustomerToolbarCreateNewMenuTrigger } from "../CustomerToolbarCreateNewMenuTrigger";

const meta = {
  title: "components/customers/CustomerToolbarCreateNewMenuTrigger",
  component: CustomerToolbarCreateNewMenuTrigger,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerToolbarCreateNewMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    newCustomerFormContainer: (
      <NewCustomerForm {...NewCustomerFormStory.args} />
    ),
    newCompanyForm: <NewCompanyForm {...NewCompanyFormStory.args} />,
  },
} satisfies Story;
