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
  isGuest: boolean;
  signOut: () => Promise<ActionState>;
  hasSession: boolean;
}

export function CtaSection({ isGuest, signOut, hasSession }: CtaSectionProps) {
  return (
    <PageSectionActions>
      <GetStartedAction
        isGuest={isGuest}
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
      <DemoAction isGuest={isGuest} hasSession={hasSession} />
    </PageSectionActions>
  );
}
