import { PageContainer } from "../common/PageContainer";

export function DocsContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-auto pt-6 max-md:pt-4 max-md:pb-8 md:pb-20">
      <PageContainer className="md:px-12">
        <main>{children}</main>
      </PageContainer>
    </div>
  );
}
