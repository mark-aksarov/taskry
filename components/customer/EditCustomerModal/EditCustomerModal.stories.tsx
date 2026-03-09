import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { EditCustomerForm } from "../EditCustomerForm";
import { EditCustomerModal } from "./EditCustomerModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { CustomerFormSkeleton } from "../CustomerFormSkeleton";
import { editCustomerFormArgs } from "../EditCustomerForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateCustomerProvider } from "../UpdateCustomerContext/__stories__";

const meta = {
  title: "components/customers/EditCustomerModal",
  component: EditCustomerModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useUpdateCustomer();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="Edit customer"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withUpdateCustomerProvider,
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
