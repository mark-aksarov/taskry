import {
  CustomerFormBase,
  CustomerFormBaseSkeleton,
} from "../CustomerFormBase";

import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { NewCustomerModal } from "./NewCustomerModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as CustomerFormBaseStory } from "../CustomerFormBase/CustomerFormBase.stories";

const meta = {
  title: "Components/customers/NewCustomerModal",
  component: NewCustomerModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New project" />
        <Story />
      </DialogTrigger>
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
