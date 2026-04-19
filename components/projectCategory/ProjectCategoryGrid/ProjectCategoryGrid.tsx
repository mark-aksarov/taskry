import { Grid } from "@/components/common/Grid";

export function ProjectCategoryGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Grid className="max-md:gap-2">{children}</Grid>;
}
