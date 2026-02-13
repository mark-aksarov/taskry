import {
  CustomerDetailBottomSheet,
  CustomerDetailBottomSheetProps,
} from "../CustomerDetailBottomSheet";

import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { useOverlayTrigger } from "react-aria";
import { Button } from "@/components/ui/Button";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverlayTriggerStateContext } from "react-aria-components";
import { CustomerDetail } from "../../CustomerDetail/CustomerDetail";
import { CustomerDetailStory } from "../../CustomerDetail/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailSkeleton } from "../../CustomerDetail/CustomerDetailSkeleton";
import { PersonDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

const meta = {
  title: "components/customers/CustomerDetailBottomSheet",
  component: CustomerDetailBottomSheet,
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
        personHeader={<DetailHeader {...PersonDetailHeaderStory.args} />}
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
        personHeader={<DetailHeaderSkeleton />}
        userDetail={<CustomerDetailSkeleton />}
      />
    ),
  },
} satisfies Story;
