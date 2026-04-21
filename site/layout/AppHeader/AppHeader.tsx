import {
  AppHeaderBase,
  AppHeaderLayout,
  AppHeaderHeading,
  AppHeaderThemeToggleButton,
} from "@/common/AppHeaderBase";

import { AppHeaderCtaButton } from "./AppHeaderCtaButton";
import { PageContainer } from "../../common/PageContainer";
import { AppHeaderLangMenuTrigger } from "./AppHeaderLangMenuTrigger";

export function AppHeader() {
  return (
    <AppHeaderBase className="bg-gray-100 dark:bg-gray-900">
      <PageContainer>
        <AppHeaderLayout
          left={<AppHeaderHeading>Taskry</AppHeaderHeading>}
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
