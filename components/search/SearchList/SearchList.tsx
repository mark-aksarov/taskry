import { List } from "@/components/common/List";

export function SearchList({ children }: { children: React.ReactNode }) {
  return (
    <List data-test="search-list" className="gap-0">
      {children}
    </List>
  );
}
