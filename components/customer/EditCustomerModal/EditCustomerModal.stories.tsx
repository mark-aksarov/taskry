import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { EditCustomerForm } from "../EditCustomerForm";
import { EditCustomerModal } from "./EditCustomerModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerFormSkeleton } from "../CustomerFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { editCustomerFormArgs } from "../EditCustomerForm/__stories__";

const meta = {
  title: "components/customers/EditCustomerModal",
  component: EditCustomerModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Edit customer" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
} satisfies Meta<typeof EditCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editCustomerFormContainer: <EditCustomerForm {...editCustomerFormArgs} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    editCustomerFormContainer: <CustomerFormSkeleton />,
  },
} satisfies Story;
