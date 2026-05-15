import { PageContainer } from "@/site/common/PageContainer";
import { PageSection } from "@/site/common/PageSection";

interface PrivacyPolicyPageProps {
  children: React.ReactNode;
}

export default function PrivacyPolicyPage({
  children,
}: PrivacyPolicyPageProps) {
  return (
    <PageSection>
      <PageContainer>
        <main>{children}</main>
      </PageContainer>
    </PageSection>
  );
}
