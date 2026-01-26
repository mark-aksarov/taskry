"use client";

import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { SearchListItemSkeleton } from "../SearchListItem";

export function SearchList({ children }: { children: React.ReactNode }) {
  return (
    <List data-test="search-list" className="gap-0">
      {children}
    </List>
  );
}

export function SearchListSkeleton() {
  return (
    <List className="gap-0">
      <Repeat items={10} renderItem={() => <SearchListItemSkeleton />} />
    </List>
  );
}
