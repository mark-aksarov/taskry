import { DocsAside } from "@/site/docs/DocsAside";
import { PageContainer } from "@/site/common/PageContainer";

export default async function AppDocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageContainer>
      <div className="flex">
        <DocsAside />
        {children}
      </div>
    </PageContainer>
  );
}
