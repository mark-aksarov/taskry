import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { NewCustomerForm } from "../NewCustomerForm";
import { NewCustomerModal } from "./NewCustomerModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { useCreateCustomer } from "../CreateCustomerContext";
import { CustomerFormSkeleton } from "../CustomerFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateCustomerProvider } from "../CreateCustomerContext/__stories__";

const meta = {
  title: "components/customers/NewCustomerModal",
  component: NewCustomerModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useCreateCustomer();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="New customer"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withCreateCustomerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof NewCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newCustomerFormContainer: (
      <NewCustomerForm companySelectItems={mockedCompanySummaries} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newCustomerFormContainer: <CustomerFormSkeleton />,
  },
} satisfies Story;
