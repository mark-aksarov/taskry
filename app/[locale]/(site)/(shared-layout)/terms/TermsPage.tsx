import { PageContainer } from "@/site/common/PageContainer";
import { PageSection } from "@/site/common/PageSection";

interface TermsPageProps {
  children: React.ReactNode;
}

export default function TermsPage({ children }: TermsPageProps) {
  return (
    <PageSection>
      <PageContainer>
        <main>{children}</main>
      </PageContainer>
    </PageSection>
  );
}
