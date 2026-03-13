import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { EditCustomerForm } from "../EditCustomerForm";
import { EditCustomerModal } from "./EditCustomerModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { mockedCompanySummaries } from "@/mocks/companies";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { CustomerFormSkeleton } from "../CustomerFormSkeleton";
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
    editCustomerFormContainer: (
      <EditCustomerForm
        {...mockedCustomerDetail}
        customerId={mockedCustomerDetail.id}
        customerCompanySelectItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    editCustomerFormContainer: <CustomerFormSkeleton />,
  },
} satisfies Story;
