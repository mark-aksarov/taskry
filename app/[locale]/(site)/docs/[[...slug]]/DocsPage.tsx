import { DocsContent } from "@/site/docs/DocsContent";
import { DocsPagination } from "@/site/docs/DocsPagination";
import { DocsBreadcrumbs } from "@/site/docs/DocsBreadcrumbs";

export function DocsPage({ children }: { children: React.ReactNode }) {
  return (
    <DocsContent>
      <DocsBreadcrumbs />
      <main>{children}</main>
      <DocsPagination />
    </DocsContent>
  );
}
