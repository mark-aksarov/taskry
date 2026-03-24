import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CreateCustomerModal } from "../CreateCustomerModal";
import { CreateCustomerForm } from "../../CreateCustomerForm";
import { CustomerFormSkeleton } from "../../CustomerFormSkeleton";
import { useCreateCustomerModal } from "../CreateCustomerModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateCustomerModalProvider } from "./withCreateCustomerModalProvider";
import { withCreateCustomerProvider } from "../../CreateCustomerContext/__stories__";

const meta = {
  title: "components/customers/CreateCustomerModal",
  component: CreateCustomerModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useCreateCustomerModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreateCustomerProvider,
    withCreateCustomerModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CreateCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createCustomerFormContainer: (
      <CreateCustomerForm companySelectItems={mockedCompanySummaries} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    createCustomerFormContainer: <CustomerFormSkeleton />,
  },
} satisfies Story;
