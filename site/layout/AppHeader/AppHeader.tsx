import {
  AppHeaderBase,
  AppHeaderLayout,
  AppHeaderThemeToggleButton,
} from "@/common/AppHeaderBase";

import { Logo } from "../Logo";
import { AppHeaderCtaButton } from "./AppHeaderCtaButton";
import { PageContainer } from "../../common/PageContainer";
import { AppHeaderLangMenuTrigger } from "./AppHeaderLangMenuTrigger";

export function AppHeader() {
  return (
    <AppHeaderBase className="border-b-1 border-slate-300 bg-slate-50/70 backdrop-blur-md dark:border-slate-600 dark:bg-slate-900/70">
      <PageContainer>
        <AppHeaderLayout
          left={<Logo />}
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
