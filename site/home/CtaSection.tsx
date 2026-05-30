"use client";

import {
  PageSectionActions,
  PageSectionActionLink,
  PageSectionActionButton,
} from "../common/PageSection";

import { DemoAction } from "./DemoAction";
import { ActionState } from "@/lib/actions/types";
import { GetStartedAction } from "../common/GetStartedAction";

interface CtaSectionProps {
  signOut: () => Promise<ActionState>;
}

export function CtaSection({ signOut }: CtaSectionProps) {
  return (
    <PageSectionActions>
      <GetStartedAction
        signOut={signOut}
        renderButton={({ isPending, handlePress, label }) => (
          <PageSectionActionButton
            variant="accent"
            isPending={isPending}
            label={label}
            onPress={handlePress}
          />
        )}
        renderLink={({ href, label }) => (
          <PageSectionActionLink href={href} variant="accent" label={label} />
        )}
      />
      <DemoAction />
    </PageSectionActions>
  );
}
