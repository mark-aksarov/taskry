import { List } from "@/components/common/List";

export function PositionList({ children }: { children: React.ReactNode }) {
  return <List data-test="position-list">{children}</List>;
}
