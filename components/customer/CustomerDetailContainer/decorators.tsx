import {
  PersonHeader,
  PersonHeaderSkeleton,
} from "@/components/common/PersonHeader";

import React from "react";
import { type Decorator } from "@storybook/react";
import { CustomerDetail, CustomerDetailSkeleton } from "../CustomerDetail";
import { Default as CustomerDetailStory } from "../CustomerDetail/CustomerDetail.stories";
import { CustomerDetailContainerContext } from "./CustomerDetailContainerContext";
import { Default as PersonHeaderStory } from "@/components/common/PersonHeader/PersonHeader.stories";

export const withCustomerDetail: Decorator = (Story) => {
  return (
    <CustomerDetailContainerContext.Provider
      value={() => (
        <div className="flex flex-col gap-6">
          <PersonHeader {...PersonHeaderStory.args} />
          <CustomerDetail {...CustomerDetailStory.args} />
        </div>
      )}
    >
      <Story />
    </CustomerDetailContainerContext.Provider>
  );
};

export const withCustomerDetailSkeleton: Decorator = (Story) => {
  return (
    <CustomerDetailContainerContext.Provider
      value={() => (
        <div className="flex flex-col gap-6">
          <PersonHeaderSkeleton />
          <CustomerDetailSkeleton />
        </div>
      )}
    >
      <Story />
    </CustomerDetailContainerContext.Provider>
  );
};
