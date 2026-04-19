"use client";

import { Repeat } from "@/components/common/Repeat";
import { SearchListItemSkeleton } from "../SearchListItem";

const styles = "flex flex-col";

export function SearchList({ children }: { children: React.ReactNode }) {
  return (
    <div data-test="search-list" className={styles}>
      {children}
    </div>
  );
}

export function SearchListSkeleton() {
  return (
    <div className={styles}>
      <Repeat items={5} renderItem={() => <SearchListItemSkeleton />} />
    </div>
  );
}
