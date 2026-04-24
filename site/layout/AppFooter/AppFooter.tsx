import { Logo } from "../Logo";
import { tv } from "tailwind-variants";
import { useTranslations } from "next-intl";
import { AppFooterLink } from "./AppFooterLink";
import { AppFooterHeading } from "./AppFooterHeading";
import { PageSection } from "@/site/common/PageSection";
import { PageContainer } from "@/site/common/PageContainer";

const footerStyles = tv({
  slots: {
    section: "border-y-1 border-slate-300 dark:border-slate-600",
    inner: "flex justify-between max-md:flex-col max-md:gap-8",
    brand: "mr-auto",
    column: "not-last:mr-20",
    description: "text-base font-normal text-gray-600 dark:text-gray-300",
    copyrightWrap: "py-8",
    copyright:
      "text-center text-sm font-normal text-gray-600 dark:text-gray-400",
  },
});

export function AppFooter() {
  const t = useTranslations("site.layout.AppFooter");

  const {
    section,
    inner,
    brand,
    column,
    description,
    copyrightWrap,
    copyright,
  } = footerStyles();

  return (
    <footer>
      <PageSection as="div" className={section()}>
        <PageContainer>
          <div className={inner()}>
            {/* Brand */}
            <div className={brand()}>
              <Logo className="mb-4" />
              <p className={description()}>
                {t("text.line1")} <br />
                {t("text.line2")}
              </p>
            </div>

            {/* Product */}
            <div className={column()}>
              <AppFooterHeading>{t("sections.product.title")}</AppFooterHeading>
              <AppFooterLink className="mb-3">
                {t("sections.product.links.features")}
              </AppFooterLink>
              <AppFooterLink className="mb-3">
                {t("sections.product.links.docs")}
              </AppFooterLink>
              <AppFooterLink>
                {t("sections.product.links.github")}
              </AppFooterLink>
            </div>

            {/* App */}
            <div className={column()}>
              <AppFooterHeading>{t("sections.app.title")}</AppFooterHeading>
              <AppFooterLink className="mb-3">
                {t("sections.app.links.open")}
              </AppFooterLink>
              <AppFooterLink>{t("sections.app.links.email")}</AppFooterLink>
            </div>

            {/* Legal */}
            <div className={column()}>
              <AppFooterHeading>{t("sections.legal.title")}</AppFooterHeading>
              <AppFooterLink className="mb-3">
                {t("sections.legal.links.privacy")}
              </AppFooterLink>
              <AppFooterLink>{t("sections.legal.links.terms")}</AppFooterLink>
            </div>
          </div>
        </PageContainer>
      </PageSection>

      <div className={copyrightWrap()}>
        <PageContainer>
          <p className={copyright()}>{t("copyright")}</p>
        </PageContainer>
      </div>
    </footer>
  );
}
