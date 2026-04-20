import {
  AppHeaderBase,
  AppHeaderLayout,
  AppHeaderHeading,
  AppHeaderLangMenuTrigger,
  AppHeaderThemeToggleButton,
} from "@/common/AppHeaderBase";

import { PageContainer } from "../../common/PageContainer";

export function AppHeader() {
  return (
    <AppHeaderBase>
      <PageContainer>
        <AppHeaderLayout
          left={<AppHeaderHeading>Taskry</AppHeaderHeading>}
          right={
            <>
              <AppHeaderThemeToggleButton />
              <AppHeaderLangMenuTrigger />
            </>
          }
          mobile={<></>}
        />
      </PageContainer>
    </AppHeaderBase>
  );
}
