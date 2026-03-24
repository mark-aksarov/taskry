import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { UpdateCustomerForm } from "../UpdateCustomerForm";
import { UpdateCustomerModal } from "./UpdateCustomerModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { mockedCompanySummaries } from "@/mocks/companies";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { CustomerFormSkeleton } from "../CustomerFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateCustomerProvider } from "../UpdateCustomerContext/__stories__";

const meta = {
  title: "components/customers/UpdateCustomerModal",
  component: UpdateCustomerModal,
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
} satisfies Meta<typeof UpdateCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateCustomerFormContainer: (
      <UpdateCustomerForm
        {...mockedCustomerDetail}
        customerId={mockedCustomerDetail.id}
        companySelectItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    updateCustomerFormContainer: <CustomerFormSkeleton />,
  },
} satisfies Story;
