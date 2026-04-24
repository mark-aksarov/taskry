"use client";

import {
  AppHeaderBase,
  AppHeaderLayout,
  AppHeaderThemeToggleButton,
} from "@/common/AppHeaderBase";

import { Logo } from "../Logo";
import { tv } from "tailwind-variants";
import { usePathname } from "@/i18n/navigation";
import { AppHeaderCtaButton } from "./AppHeaderCtaButton";
import { PageContainer } from "../../common/PageContainer";
import { AppHeaderLangMenuTrigger } from "./AppHeaderLangMenuTrigger";
import { DocsSidebarSheetTrigger } from "@/site/docs/DocsSidebarSheetTrigger";

const styles = tv({
  base: [
    "border-b border-slate-300 dark:border-slate-600",
    "bg-slate-50/70 dark:bg-slate-900/70",
    "backdrop-blur-md",
  ],
});

export function AppHeader() {
  const pathname = usePathname();

  const isDocsPage = pathname?.startsWith("/docs");

  return (
    <AppHeaderBase className={styles()}>
      <PageContainer className={isDocsPage ? "max-w-auto" : ""}>
        <AppHeaderLayout
          className="max-md:gap-2!"
          leftClassName="gap-2"
          rightClassName="max-md:gap-2!"
          left={
            <>
              {isDocsPage && <DocsSidebarSheetTrigger key={pathname} />}
              <Logo />
            </>
          }
          right={
            <>
              <AppHeaderThemeToggleButton />
              <AppHeaderLangMenuTrigger />
              <AppHeaderCtaButton />
            </>
          }
        />
      </PageContainer>
    </AppHeaderBase>
  );
}
