"use client";

import { PageSectionActions } from "./PageSection";
import { GetStartedAction } from "./GetStartedAction";
import { AppOverviewAction } from "./AppOverviewAction";

export function CtaActions({ children }: { children: React.ReactNode }) {
  return (
    <PageSectionActions>
      <GetStartedAction />
      {children}
    </PageSectionActions>
  );
}
