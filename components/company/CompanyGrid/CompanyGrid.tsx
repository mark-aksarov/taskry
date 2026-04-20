import { EntityGrid } from "@/components/common/EntityGrid";

export function CompanyGrid({ children }: { children: React.ReactNode }) {
  return <EntityGrid className="max-md:gap-2">{children}</EntityGrid>;
}
