import { List } from "@/components/common/List";

export function CompanyList({ children }: { children: React.ReactNode }) {
  return <List data-test="companies-list">{children}</List>;
}
