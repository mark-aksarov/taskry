import React from "react";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { type Decorator } from "@storybook/react";
import { UserHeader, UserHeaderSkeleton } from "@/components/users/UserHeader";
import { UserDetailClientContainerContext } from "./UserDetailClientContainerContext";
import { Default as UserDetailStory } from "@/components/users/UserDetail/UserDetail.stories";
import { Default as UserHeaderStory } from "@/components/users/UserHeader/UserHeader.stories";

export const withUserDetail: Decorator = (Story) => {
  return (
    <UserDetailClientContainerContext.Provider
      value={() => (
        <div className="flex flex-col gap-6">
          <UserHeader {...UserHeaderStory.args} />
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
          <UserHeaderSkeleton />
          <UserDetailSkeleton />
        </div>
      )}
    >
      <Story />
    </UserDetailClientContainerContext.Provider>
  );
};
