import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { EditCustomerForm } from "../EditCustomerForm";
import { EditCustomerModal } from "./EditCustomerModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerFormSkeleton } from "../CustomerFormSkeleton";
import { EditCustomerFormStory } from "../EditCustomerForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/customers/EditCustomerModal",
  component: EditCustomerModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Edit customer" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof EditCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editCustomerFormContainer: (
      <EditCustomerForm {...EditCustomerFormStory.args} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    editCustomerFormContainer: <CustomerFormSkeleton />,
  },
} satisfies Story;
