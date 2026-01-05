import { List } from "@/components/common/List";

export function CustomerList({ children }: { children: React.ReactNode }) {
  return <List data-test="customers-list">{children}</List>;
}
