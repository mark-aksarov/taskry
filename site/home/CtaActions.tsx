import { DemoButton } from "./DemoButton";
import { useTranslations } from "next-intl";
import { ActionState } from "@/lib/actions/types";
import { PageSectionAction, PageSectionActions } from "../common/PageSection";

interface CtaActionsProps {
  signInAsDemoUser: () => Promise<ActionState>;
}

export function CtaActions({ signInAsDemoUser }: CtaActionsProps) {
  const t = useTranslations("site.blocks.CtaActions");

  return (
    <PageSectionActions>
      <PageSectionAction
        as="a"
        href="/dashboard"
        variant="primary"
        label={t("GetStartedButton.label")}
      />
      <DemoButton signInAsDemoUser={signInAsDemoUser} />
    </PageSectionActions>
  );
}
