import { Logo } from "../Logo";
import { tv } from "tailwind-variants";
import { useTranslations } from "next-intl";
import { AppFooterLink } from "./AppFooterLink";
import { AppFooterHeading } from "./AppFooterHeading";
import { PageSection } from "@/site/common/PageSection";
import { PageContainer } from "@/site/common/PageContainer";

const footerStyles = tv({
  slots: {
    wrapper: "",
    section: "border-y-1 border-slate-300 dark:border-slate-600",
    inner: "flex justify-between max-md:flex-col max-md:gap-8",
    brand: "grow-3",
    column: "grow-1",
    description: "text-base font-normal text-gray-600 dark:text-gray-300",
    copyrightWrap: "py-8",
    copyright:
      "text-center text-sm font-normal text-gray-600 dark:text-gray-400",
  },
});

export function AppFooter() {
  const t = useTranslations("site.layout.AppFooter");
  const s = footerStyles();

  return (
    <footer className={s.wrapper()}>
      <PageSection as="div" className={s.section()}>
        <PageContainer>
          <div className={s.inner()}>
            {/* Brand */}
            <div className={s.brand()}>
              <Logo className="mb-4" />
              <p className={s.description()}>
                {t("text.line1")} <br />
                {t("text.line2")}
              </p>
            </div>

            {/* Product */}
            <div className={s.column()}>
              <AppFooterHeading>{t("sections.product.title")}</AppFooterHeading>
              <AppFooterLink>
                {t("sections.product.links.features")}
              </AppFooterLink>
              <AppFooterLink>{t("sections.product.links.docs")}</AppFooterLink>
              <AppFooterLink>
                {t("sections.product.links.github")}
              </AppFooterLink>
            </div>

            {/* App */}
            <div className={s.column()}>
              <AppFooterHeading>{t("sections.app.title")}</AppFooterHeading>
              <AppFooterLink>{t("sections.app.links.open")}</AppFooterLink>
              <AppFooterLink>{t("sections.app.links.email")}</AppFooterLink>
            </div>

            {/* Legal */}
            <div className={s.column()}>
              <AppFooterHeading>{t("sections.legal.title")}</AppFooterHeading>
              <AppFooterLink>{t("sections.legal.links.privacy")}</AppFooterLink>
              <AppFooterLink>{t("sections.legal.links.terms")}</AppFooterLink>
            </div>
          </div>
        </PageContainer>
      </PageSection>

      <div className={s.copyrightWrap()}>
        <PageContainer>
          <p className={s.copyright()}>{t("copyright")}</p>
        </PageContainer>
      </div>
    </footer>
  );
}
