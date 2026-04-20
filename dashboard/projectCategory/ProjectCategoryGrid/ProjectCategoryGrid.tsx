import { EntityGrid } from "@/dashboard/common/EntityGrid";

export function ProjectCategoryGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EntityGrid className="max-md:gap-2">{children}</EntityGrid>;
}
