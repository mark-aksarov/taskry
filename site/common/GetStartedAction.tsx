"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PageSectionActionLink } from "./PageSection";
import { useSession } from "@/common/SessionContext";
import { ButtonLinkProps } from "@/ui/Button/ButtonLink";

type GetStartedActionProps = Pick<ButtonLinkProps, "className" | "size">;

export function GetStartedAction({ className, size }: GetStartedActionProps) {
  const t = useTranslations("site.home.GetStartedAction");

  const session = useSession();
  const emailVerified = session?.user.emailVerified;
  const organizationId = session?.session.activeOrganizationId;

  // If user is not signed in, redirect to the sign-in page
  // If user is signed in but email is not verified, redirect to the email verification page
  // If user is signed in and email is verified but has no organization, redirect to the organization creation page
  // If user is signed in, email is verified, and has an organization, redirect to the dashboard
  let href = "/dashboard";

  if (!session) {
    href = "/sign-in";
  } else if (!emailVerified) {
    href = "/verify-email";
  } else if (!organizationId) {
    href = "/create-organization";
  }

  return (
    <PageSectionActionLink
      href={href}
      size={size}
      variant="accent"
      label={t("label")}
      className={className}
    />
  );
}
