import { DocsAside } from "@/site/docs/DocsAside";
import { DocsContent } from "@/site/docs/DocsContent";
import { DocsBreadcrumbs } from "@/site/docs/DocsBreadcrumbs";

export function DocsPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <DocsAside />
      <DocsContent>
        <DocsBreadcrumbs />
        {children}
      </DocsContent>
    </div>
  );
}
