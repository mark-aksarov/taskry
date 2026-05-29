"use client";

import {
  AppHeaderBase,
  AppHeaderLayout,
  AppHeaderThemeToggleButton,
} from "@/common/AppHeaderBase";

import { Logo } from "../Logo";
import { tv } from "tailwind-variants";
import { usePathname } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { AppHeaderCtaButton } from "./AppHeaderCtaButton";
import { PageContainer } from "../../common/PageContainer";
import { AppHeaderLangMenuTrigger } from "./AppHeaderLangMenuTrigger";
import { DocsSidebarSheetTrigger } from "@/site/docs/DocsSidebarSheetTrigger";

const styles = tv({
  base: [
    "border-b border-(--border-primary)",
    "bg-(--surface-secondary)/70",
    "backdrop-blur-md",
  ],
});

interface AppHeaderCtaButtonProps {
  isGuest: boolean;
  isEmailVerified: boolean;
  signOut: () => Promise<ActionState>;
}

export function AppHeader({
  isGuest,
  isEmailVerified,
  signOut,
}: AppHeaderCtaButtonProps) {
  const pathname = usePathname();

  const isDocsPage = pathname?.startsWith("/docs");

  return (
    <AppHeaderBase className={styles()}>
      <PageContainer>
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
              <AppHeaderCtaButton
                isGuest={isGuest}
                isEmailVerified={isEmailVerified}
                signOut={signOut}
              />
            </>
          }
        />
      </PageContainer>
    </AppHeaderBase>
  );
}
