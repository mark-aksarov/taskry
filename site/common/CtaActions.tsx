"use client";

import { GithubAction } from "./GithubAction";
import { PageSectionActions } from "./PageSection";
import { GetStartedAction } from "./GetStartedAction";

export function CtaActions() {
  return (
    <PageSectionActions>
      <GetStartedAction />
      <GithubAction />
    </PageSectionActions>
  );
}
