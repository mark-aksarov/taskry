import {
  CustomerDetailBottomSheet,
  CustomerDetailBottomSheetProps,
} from "./CustomerDetailBottomSheet";

import { Button } from "@/components/ui";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCustomerDetailSkeleton } from "@/components/customer/CustomerDetailClientContainer/decorators";

const meta = {
  title: "components/customers/CustomerDetailBottomSheet",
  component: CustomerDetailBottomSheet,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  args: {
    customerId: 1,
    state: {
      isOpen: true,
      setOpen: () => {},
      open: () => {},
      close: () => {},
      toggle: () => {},
    },
  },
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
  render: (args) => <CustomerDetailBottomSheetTemplate {...args} />,
} satisfies Meta<typeof CustomerDetailBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const CustomerDetailBottomSheetTemplate = ({
  ...props
}: CustomerDetailBottomSheetProps) => {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <Button {...triggerProps} label="Customer Detail" />
      <CustomerDetailBottomSheet {...props} state={state} />
    </>
  );
};

export const Default = {} satisfies Story;

export const WithSkeletonContent = {
  decorators: [withCustomerDetailSkeleton],
} satisfies Story;
