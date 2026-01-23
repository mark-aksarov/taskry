import { Suspense } from "react";
import { NewCustomerModal } from "./NewCustomerModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  CustomerFormBase,
  CustomerFormBaseSkeleton,
} from "../CustomerFormBase";
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

export const Default = {
  args: {
    newCustomerFormContainer: (
      <CustomerFormBase {...CustomerFormBaseStory.args} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newCustomerFormContainer: <CustomerFormBaseSkeleton />,
  },
} satisfies Story;
