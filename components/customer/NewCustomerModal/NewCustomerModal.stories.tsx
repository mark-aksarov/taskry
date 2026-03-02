import { Button } from "@/components/ui/Button";
import { NewCustomerForm } from "../NewCustomerForm";
import { DialogTrigger } from "react-aria-components";
import { NewCustomerModal } from "./NewCustomerModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CustomerFormSkeleton } from "../CustomerFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { useState } from "react";

const meta = {
  title: "components/customers/NewCustomerModal",
  component: NewCustomerModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="New customer" />
          <Story />
        </DialogTrigger>
      );
    },
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
