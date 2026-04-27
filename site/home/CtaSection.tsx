import { DemoAction } from "./DemoAction";
import { ActionState } from "@/lib/actions/types";
import { GetStartedAction } from "./GetStartedAction";
import { PageSectionActions } from "../common/PageSection";

interface CtaSectionProps {
  isGuest: boolean;
  signOut: () => Promise<ActionState>;
  hasSession: boolean;
}

export function CtaSection({ isGuest, signOut, hasSession }: CtaSectionProps) {
  return (
    <PageSectionActions>
      <GetStartedAction isGuest={isGuest} signOut={signOut} />
      <DemoAction isGuest={isGuest} hasSession={hasSession} />
    </PageSectionActions>
  );
}
