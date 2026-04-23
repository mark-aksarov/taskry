import { useTranslations } from "next-intl";
import { AppFooterLink } from "./AppFooterLink";
import { AppFooterHeading } from "./AppFooterHeading";
import { PageSection } from "@/site/common/PageSection";
import { PageContainer } from "@/site/common/PageContainer";
import { Logo } from "../Logo";

export function AppFooter() {
  const t = useTranslations("site.layout.AppFooter");

  return (
    <footer>
      <PageSection
        as="div"
        className="border-y-1 border-slate-300 dark:border-slate-600"
      >
        <PageContainer>
          <div className="flex justify-between max-md:flex-col max-md:gap-8">
            <div className="grow-3">
              <Logo className="mb-4" />
              <p className="text-base font-normal text-gray-600 dark:text-gray-300">
                {t("text.line1")} <br />
                {t("text.line2")}
              </p>
            </div>

            <div className="grow-1">
              <AppFooterHeading>{t("sections.product.title")}</AppFooterHeading>
              <AppFooterLink>
                {t("sections.product.links.features")}
              </AppFooterLink>
              <AppFooterLink>{t("sections.product.links.docs")}</AppFooterLink>
              <AppFooterLink>
                {t("sections.product.links.github")}
              </AppFooterLink>
            </div>

            <div className="grow-1">
              <AppFooterHeading>{t("sections.app.title")}</AppFooterHeading>
              <AppFooterLink>{t("sections.app.links.open")}</AppFooterLink>
              <AppFooterLink>{t("sections.app.links.email")}</AppFooterLink>
            </div>

            <div className="grow-1">
              <AppFooterHeading>{t("sections.legal.title")}</AppFooterHeading>
              <AppFooterLink>{t("sections.legal.links.privacy")}</AppFooterLink>
              <AppFooterLink>{t("sections.legal.links.terms")}</AppFooterLink>
            </div>
          </div>
        </PageContainer>
      </PageSection>
      <div className="py-8">
        <PageContainer>
          <p className="text-center text-sm font-normal text-gray-600 dark:text-gray-400">
            {t("copyright")}
          </p>
        </PageContainer>
      </div>
    </footer>
  );
}
