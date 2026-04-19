import { Grid } from "@/components/common/Grid";

export function CompanyGrid({ children }: { children: React.ReactNode }) {
  return <Grid className="max-md:gap-2">{children}</Grid>;
}
