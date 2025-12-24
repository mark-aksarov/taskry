import { Suspense } from "react";
import { NewCustomerForm } from "../NewCustomerForm";
import { NewCustomerModal } from "./NewCustomerModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { CustomerFormBaseSkeleton } from "../CustomerFormBase";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as CustomerFormBaseStory } from "../CustomerFormBase/CustomerFormBase.stories";

const meta = {
  title: "Components/customers/NewCustomerModal",
  component: NewCustomerModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="New project" />
        <Suspense>
          <Story />
        </Suspense>
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    newCompanyForm: <NewCustomerForm {...CustomerFormBaseStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newCompanyForm: <CustomerFormBaseSkeleton />,
  },
} satisfies Story;
