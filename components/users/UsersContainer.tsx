"use client";

import dynamic from "next/dynamic";
import { UserListSkeleton } from "./UserList";
import { UserGridMobileSkeleton } from "./UserGrid";
import { UserListItemDTO } from "@/lib/data/user/user.dto";

const UsersDynamic = dynamic(
  () => import("./UsersDynamic").then((mod) => mod.UsersDynamic),
  {
    ssr: false,
    loading: () => (
      <>
        <UserListSkeleton className="max-md:hidden" items={10} />
        <UserGridMobileSkeleton className="md:hidden" items={10} />
      </>
    ),
  },
);

export interface UsersContainerProps {
  users: UserListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function UsersContainer({
  users,
  totalCount,
  page,
  pageSize,
}: UsersContainerProps) {
  return (
    <UsersDynamic
      page={page}
      pageSize={pageSize}
      users={users}
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
