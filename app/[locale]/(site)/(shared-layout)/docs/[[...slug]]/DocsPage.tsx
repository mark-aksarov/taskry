import { DocsAside } from "@/site/docs/DocsAside";
import { DocsContent } from "@/site/docs/DocsContent";
import { DocsPagination } from "@/site/docs/DocsPagination";
import { PageContainer } from "@/site/common/PageContainer";
import { DocsBreadcrumbs } from "@/site/docs/DocsBreadcrumbs";

export function DocsPage({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer>
      <div className="flex">
        <DocsAside />
        <DocsContent>
          <DocsBreadcrumbs />
          <main>{children}</main>
          <DocsPagination />
        </DocsContent>
      </div>
    </PageContainer>
  );
}
