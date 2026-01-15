"use client";

import { SearchContainer, SearchContainerProps } from "./SearchContainer";
import { UserSearchListItem } from "./UserSearchListItem";
import { UserSearchItemDTO } from "@/lib/data/user/user.dto";

type UsersSearchContainerProps = Omit<
  SearchContainerProps<UserSearchItemDTO>,
  "endpoint" | "renderItem"
>;

export function UsersSearchContainer(props: UsersSearchContainerProps) {
  return (
    <SearchContainer
      endpoint="/api/users/search"
      renderItem={(item: UserSearchItemDTO) => (
        <UserSearchListItem
          key={item.id}
          id={item.id}
          fullName={item.fullName}
          email={item.email}
          imageUrl={item.imageUrl}
        />
      )}
      {...props}
    />
  );
}
