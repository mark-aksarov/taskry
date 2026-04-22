import {
  PageSection,
  PageSectionHeader,
  PageSectionAction,
  PageSectionContent,
  PageSectionHeading,
  PageSectionActions,
  PageSectionDescription,
} from "@/site/common/PageSection";

import { useTranslations } from "next-intl";
import { DocsGrid } from "@/site/blocks/DocsGrid";
import { PageContainer } from "@/site/common/PageContainer";
import { FileText } from "lucide-react";

export function DocsSection() {
  const t = useTranslations("site.sections.DocsSection");

  return (
    <PageSection>
      <PageContainer>
        <PageSectionContent>
          <PageSectionHeader>
            <PageSectionHeading>{t("heading")}</PageSectionHeading>
            <PageSectionDescription>
              {t("description.line1")} <br className="max-sm:hidden" />
              {t("description.line2")}
            </PageSectionDescription>
          </PageSectionHeader>
          <DocsGrid />

          <PageSectionActions>
            <PageSectionAction
              as="a"
              href="/docs"
              iconLeft={<FileText size={20} />}
              label={t("CtaButton.label")}
            />
          </PageSectionActions>
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
