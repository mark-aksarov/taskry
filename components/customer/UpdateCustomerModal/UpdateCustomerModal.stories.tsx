import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { mockedCompanySummaries } from "@/mocks/companies";
import { UpdateCustomerForm } from "../UpdateCustomerForm";
import { UpdateCustomerModal } from "./UpdateCustomerModal";
import { CustomerFormSkeleton } from "../CustomerFormSkeleton";
import { withUpdateCustomerModalProvider } from "./__stories__";
import { useUpdateCustomerModal } from "./UpdateCustomerModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateCustomerProvider } from "../UpdateCustomerProvider/__stories__";

const meta = {
  title: "components/customers/UpdateCustomerModal",
  component: UpdateCustomerModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useUpdateCustomerModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Update customer" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withUpdateCustomerProvider,
    withUpdateCustomerModalProvider,
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
