import {
  AppHeaderBase,
  AppHeaderLayout,
  AppHeaderHeading,
  AppHeaderLangMenuTrigger,
  AppHeaderThemeToggleButton,
} from "@/common/AppHeaderBase";

import { AppHeaderCtaButton } from "./AppHeaderCtaButton";
import { PageContainer } from "../../common/PageContainer";

export function AppHeader() {
  const heading = <AppHeaderHeading>Taskry</AppHeaderHeading>;

  return (
    <AppHeaderBase>
      <PageContainer>
        <div className="max-md:hidden">
          <AppHeaderLayout
            left={heading}
            right={
              <>
                <AppHeaderThemeToggleButton />
                <AppHeaderLangMenuTrigger />
                <AppHeaderCtaButton />
              </>
            }
          />
        </div>
        <div className="md:hidden">
          <AppHeaderLayout
            left={heading}
            right={
              <>
                <AppHeaderThemeToggleButton />
                <AppHeaderLangMenuTrigger />
                <AppHeaderCtaButton />
              </>
            }
          />
        </div>
      </PageContainer>
    </AppHeaderBase>
  );
}
