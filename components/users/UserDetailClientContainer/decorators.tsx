import React from "react";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { type Decorator } from "@storybook/react";
import {
  PersonHeader,
  PersonHeaderSkeleton,
} from "@/components/common/PersonHeader";
import { UserDetailClientContainerContext } from "./UserDetailClientContainerContext";
import { Default as UserDetailStory } from "@/components/users/UserDetail/UserDetail.stories";
import { Default as PersonHeaderStory } from "@/components/common/PersonHeader/PersonHeader.stories";

export const withUserDetail: Decorator = (Story) => {
  return (
    <UserDetailClientContainerContext.Provider
      value={() => (
        <div className="flex flex-col gap-6">
          <PersonHeader {...PersonHeaderStory.args} />
          <UserDetail {...UserDetailStory.args} />
        </div>
      )}
    >
      <Story />
    </UserDetailClientContainerContext.Provider>
  );
};

export const withUserDetailSkeleton: Decorator = (Story) => {
  return (
    <UserDetailClientContainerContext.Provider
      value={() => (
        <div className="flex flex-col gap-6">
          <PersonHeaderSkeleton />
          <UserDetailSkeleton />
        </div>
      )}
    >
      <Story />
    </UserDetailClientContainerContext.Provider>
  );
};
