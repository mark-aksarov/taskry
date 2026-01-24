import {
  PersonHeader,
  PersonHeaderSkeleton,
} from "@/components/common/PersonHeader";

import {
  CustomerDetailBottomSheet,
  CustomerDetailBottomSheetProps,
} from "./CustomerDetailBottomSheet";

import { useOverlayTrigger } from "react-aria";
import { Button } from "@/components/ui/Button";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerDetail } from "../CustomerDetail/CustomerDetail";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailSkeleton } from "../CustomerDetail/CustomerDetailSkeleton";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";
import { Default as CustomerDetailStory } from "../CustomerDetail/CustomerDetail.stories";
import { Default as PersonHeaderStory } from "@/components/common/PersonHeader/PersonHeader.stories";

const meta = {
  title: "components/customers/CustomerDetailBottomSheet",
  component: CustomerDetailBottomSheet,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  args: {
    customerId: 1,
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
    <OverlayTriggerStateContext.Provider value={state}>
      <Button {...triggerProps} label="Customer Detail" />
      <CustomerDetailBottomSheet {...props} />
    </OverlayTriggerStateContext.Provider>
  );
};

export const Default = {
  args: {
    customerId: 1,
    customerDetailContainer: (
      <PersonDetailPresentation
        personHeader={<PersonHeader {...PersonHeaderStory.args} />}
        userDetail={<CustomerDetail {...CustomerDetailStory.args} />}
      />
    ),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    customerId: 1,
    customerDetailContainer: (
      <PersonDetailPresentation
        personHeader={<PersonHeaderSkeleton />}
        userDetail={<CustomerDetailSkeleton />}
      />
    ),
  },
} satisfies Story;
