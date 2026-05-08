import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
  PageSectionHeading,
  PageSectionActions,
  PageSectionDescription,
  PageSectionActionLink,
} from "@/site/common/PageSection";

import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { DocsSectionGrid } from "./DocsSectionGrid";
import { PageContainer } from "@/site/common/PageContainer";

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
          <DocsSectionGrid />

          <PageSectionActions>
            <PageSectionActionLink
              href="/docs"
              variant="accent"
              iconLeft={<FileText size={20} />}
              label={t("CtaButton.label")}
            />
          </PageSectionActions>
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
