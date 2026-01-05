import { List } from "@/components/common/List";

export function UserList({ children }: { children: React.ReactNode }) {
  return <List data-test="users-list">{children}</List>;
}
