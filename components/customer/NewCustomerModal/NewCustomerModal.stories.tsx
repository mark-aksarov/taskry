import { Button } from "@/components/ui/Button";
import { NewCustomerForm } from "../NewCustomerForm";
import { DialogTrigger } from "react-aria-components";
import { NewCustomerModal } from "./NewCustomerModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerFormSkeleton } from "../CustomerFormSkeleton";
import { NewCustomerFormStory } from "../NewCustomerForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/customers/NewCustomerModal",
  component: NewCustomerModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New customer" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newCustomerFormContainer: (
      <NewCustomerForm {...NewCustomerFormStory.args} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newCustomerFormContainer: <CustomerFormSkeleton />,
  },
} satisfies Story;
